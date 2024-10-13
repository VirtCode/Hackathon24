import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import {Meetup, Mensa} from "../api/group";
import { getMensaLayout } from "../api/mensas";
import * as d3 from "d3";
import { Selection } from "d3";
import "./MensaDetail.css"
import { refresh } from 'ionicons/icons';
import {getActiveMeetups} from "../api/meetup";

interface MensaDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {
  mensas: Mensa[];
}

const MensaDetail: React.FC<MensaDetailProps> = ({ match, mensas }) => {
  const id = match.params.id;
  const ref = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<string>("");
  const [table, setTable] = useState<string>("");
  const [meetups, setMeetups] = useState<Array<Meetup>>([]);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const mensa = mensas.find((m) => m.id == id);

  useEffect(() => {
    getActiveMeetups().then(setMeetups).catch(err => console.error("Failed to fetch meetups: " + err))
  }, []);

  useEffect(() => {
    if (!mensa) return;
    const fetchLayout = async () => {
      const layout = await getMensaLayout(id);
      setLayout(layout);
    };
    fetchLayout().then(() => console.log("Fetched layout from ", mensa?.name));
  }, [mensa]);

  useEffect(() => {
    console.log(meetups, layout)
    if (meetups.length == 0 || !layout) return;
    meetups.forEach(meetup => {
      const rect = document.getElementById(meetup.table.id);
      console.warn(rect)
      // the meetup is not in this mensa
      if (!rect) return;
      rect.setAttribute("data-active", "true");
    })
  }, [meetups, layout]);

  useEffect(() => {
    if (!layout) return;
    setTimeout(() => {
      const selection: Selection<Element, any, any, any> = d3.select("svg");
      selection.call(zoom)

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
    const target = event.target as HTMLElement;
    if (target.classList.contains("table")) {
      // the clicked element was a table
      const id = target.id;
      const old = document.querySelector("rect[data-selected=true]");
      if (old) {
        old.removeAttribute("data-selected");
      }
      target.setAttribute("data-selected", "true");
      setTable(id);
    }
  };

  const zoom = d3.zoom().on("zoom", (e) => {
    d3.select("svg g").attr("transform", e.transform);
    setIsDirty(true);
  });

  if (!mensa) return;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{mensa.name}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Tables
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <section className={"svg-container"} ref={ref} dangerouslySetInnerHTML={{ __html: layout }} />
            {isDirty && (
                <IonFab slot={"fixed"} horizontal={"end"} vertical={"bottom"}>
                  <IonFabButton size={"small"} onClick={resetZoomAndPan}>
                    <IonIcon icon={refresh} />
                  </IonFabButton>
                </IonFab>
            )}
          </IonCardContent>
        </IonCard>
        <IonButton href={`/create/${table}`} style={{ width: "calc(100% - 20px)" }} disabled={!table}>
          Continue
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MensaDetail;
