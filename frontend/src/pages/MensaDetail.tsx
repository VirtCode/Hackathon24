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
import GroupMemberList from "../components/GroupMemberList";

interface MensaDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {
  mensas: Mensa[];
}

const MensaDetail: React.FC<MensaDetailProps> = ({ match, mensas }) => {
  const id = match.params.id;

  let mensa = mensas.find((m) => m.id == Number.parseInt(id));

  if (!mensa) return;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{mensa.name}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
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
            <img src={mensa.image} alt="Mensa image" />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Members</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <GroupMemberList
              members={[
                { id: 1, name: "Noel" },
                { id: 2, name: "Arthur" },
              ]}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MensaDetail;
