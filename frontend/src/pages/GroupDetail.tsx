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

interface GroupDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupDetail: React.FC<GroupDetailProps> = ({ match }) => {
  const id = match.params.id;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Group {id}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/groups" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Upcoming Meeting</IonCardTitle>
            <IonCardSubtitle>12. October 2024 04.50 pm</IonCardSubtitle>
          </IonCardHeader>
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
        <IonCard>
            <IonCardHeader>
              <IonCardTitle>Share Link</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <p>https://example.com/group/{id}</p>
                <IonButton>Share</IonButton>
            </IonCardContent>
          </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GroupDetail;
