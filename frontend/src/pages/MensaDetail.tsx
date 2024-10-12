import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Mensa } from "../api/group";

interface MensaDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {
  mensas: Mensa[];
}

const MensaDetail: React.FC<MensaDetailProps> = ({ match, mensas }) => {
  const id = match.params.id;

  let mensa = mensas.find((m) => m.id == id);

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
            <IonCardSubtitle color={mensa.open ? "success" : "warning"}>
              {mensa.open ? "Open" : "Closed"}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <img src={mensa.image} alt="Mensa image" draggable={false} />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MensaDetail;
