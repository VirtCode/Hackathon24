import {RouteComponentProps} from "react-router";
import React, {MutableRefObject, useEffect, useMemo, useRef, useState} from "react";
import {addSessionTables, getSession, removeSessionTables} from "../api/sessions";
import {Session as ISession} from "../api/group";
import {
    IonBackButton, IonBadge, IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton,
    IonHeader, IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import * as d3 from "d3";
import {getMensaLayout} from "../api/mensas";
import {Selection} from "d3";
import {refresh} from "ionicons/icons";
import "./Session.css"

interface SessionProps extends RouteComponentProps<{
    id: string;
}> {}

const Session: React.FC<SessionProps> = ({ match }) => {
    const sessionId: string = match.params.id;
    const [session, setSession] = useState<ISession>();
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [layout, setLayout] = useState<string>("");
    const [tables, setTables] = useState<Array<string>>([]);
    const tableRef: MutableRefObject<Array<string>> = useRef(tables);
    const ref = useRef<HTMLDivElement>(null);

    const areTablesDirty = useMemo(() => {
        if (!session) return false;
        if (session?.tables?.length !== tables.length) return true;
        else return session.tables?.filter(t => tables.includes(t.id)).length !== session.tables?.length;
    }, [tables, session])

    useEffect(() => {
        tableRef.current = tables;
    }, [tables]);

    useEffect(() => {
        if (!session) return;
        setTables(session.tables?.map(t => t.id) || []);
        const fetchLayout = async () => {
            const layout = await getMensaLayout(session.mensa.id);
            setLayout(layout);
        };
        fetchLayout().then(() => console.log("Fetched layout from ", session.mensa?.name));
    }, [session]);

    useEffect(() => {
        if (!sessionId) return;
        getSession(sessionId).then(setSession).catch(err => console.error("Error whilst fetching session: " + err))
    }, [sessionId]);

    useEffect(() => {
        if (!layout) return;
        setTimeout(() => {
            const selection: Selection<Element, any, any, any> = d3.select("svg");
            selection.call(zoom)

            if (session) {
                session.tables?.forEach(table => {
                    const rect = document.getElementById(table.id);
                    if (!rect) return;
                    rect.setAttribute("data-selected", "true");
                })
            }

            const svgElement = ref.current?.firstElementChild as HTMLElement;
            if (!svgElement) return;
            svgElement.addEventListener("click", handleSvgClick as any);
        });
    }, [layout]);

    const resetZoomAndPan = () => {
        const selection: Selection<Element, any, any, any> = d3.select("svg");
        selection.call(zoom.transform, d3.zoomIdentity);
        setIsDirty(false)
    };

    const handleSvgClick = (event: React.MouseEvent<SVGElement>) => {
        if (!session?.active) return;
        const target = event.target as HTMLElement;
        if (target.classList.contains("table")) {
            // the clicked element was a table
            const id = target.id;
            const tables = tableRef.current;
            console.log("tables included " + tables.includes(id), tables)
            if (tables.includes(id)) {
                target.removeAttribute("data-selected");
                setTables((tables) => tables.filter(t => t !== id));
            } else {
                target.setAttribute("data-selected", "true");
                setTables((tables) => [...tables, id]);
            }
        }
    };

    const handleTableSave = async () => {
        const toRemove = session?.tables?.filter(t => !tables.find(ta => ta === t.id))?.map(t => t.id) || [];
        const toAdd = tables.filter(t => !session?.tables?.find(ta => ta.id === t));
        await addSessionTables(sessionId, toAdd);
        const updated = await removeSessionTables(sessionId, toRemove);
        setSession(updated);
    }

    const zoom = d3.zoom().on("zoom", (e) => {
        d3.select("svg g").attr("transform", e.transform);
        setIsDirty(true);
    });

    const isPastSession= session?.start && new Date(session.start).getTime() < Date.now();
    const hasSessionEnded = session?.end && new Date(session.end).getTime() < Date.now();
    const formatStartDate = session?.start && new Date(session.start).toLocaleString();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Group session</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {session && (
                    <>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle style={{ display: "flex", justifyContent: "space-between" }}>
                                    Information
                                    <div className={"badge-container"}>
                                        <IonBadge color={session?.active ? "primary" : "warning"}>
                                            {session?.active ? "active session" : session?.pending ? "planned session" : "session ended"}
                                        </IonBadge>
                                    </div>
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                The{isPastSession ? "" : " planned"} session of group <a href={`/group/${session.group?.id}`}>{session.group?.name}</a> {isPastSession ? "started" : "starts"} at {formatStartDate}
                            </IonCardContent>
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>
                                    Tables of {session.mensa?.name}
                                </IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                {tables.length == 0 && (
                                    <i>The session does not{isPastSession ? "" : " yet"} have a table assigned</i>
                                )}
                                <section ref={ref} className={`svg-container ${!session?.active ? "readonly" : ""}`} dangerouslySetInnerHTML={{ __html: layout }} />
                                {isDirty && (
                                    <IonFab slot={"fixed"} horizontal={"end"} vertical={"bottom"}>
                                        <IonFabButton size={"small"} onClick={resetZoomAndPan}>
                                            <IonIcon icon={refresh} />
                                        </IonFabButton>
                                    </IonFab>
                                )}
                            </IonCardContent>
                        </IonCard>
                        {!hasSessionEnded && (
                            <IonButton
                                onClick={handleTableSave}
                                style={{ width: "calc(100% - 20px)" }}
                                disabled={!areTablesDirty}
                            >
                                Update session tables
                            </IonButton>
                        )}
                    </>
                )}
            </IonContent>
        </IonPage>
    )
}

export default Session;