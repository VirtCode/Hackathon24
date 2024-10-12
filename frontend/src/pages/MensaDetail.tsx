import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Mensa } from "../api/group";
import { getMensaLayout } from "../api/mensas";
import * as d3 from "d3";
import { Selection } from "d3";
import "./MensaDetail.css"
import { refresh } from 'ionicons/icons';

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

  useEffect(() => {
    getMensaLayout(id, setLayout);
  }, []);

  useEffect(() => {
    if (!layout) return;
    const selection: Selection<Element, any, any, any> = d3.select("svg");
    zoom(selection);

    const svgElement = ref.current?.firstElementChild as HTMLElement;
    if (!svgElement) return;
    svgElement.addEventListener("click", handleSvgClick as any);
  }, [layout]);

  const resetZoomAndPan = () => {
    const selection: Selection<Element, any, any, any> = d3.select("svg");
    zoom.transform(selection, d3.zoomIdentity);
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
  });

  let mensa = mensas.find((m) => m.id == id);

  console.log("selected table: " + table);

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
              Select your table
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <section className={"svg-container"} ref={ref} dangerouslySetInnerHTML={{ __html: layout }} />
            <IonFab slot={"fixed"} horizontal={"end"} vertical={"bottom"}>
              <IonFabButton size={"small"} onClick={resetZoomAndPan}>
                <IonIcon icon={refresh} />
              </IonFabButton>
            </IonFab>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MensaDetail;
