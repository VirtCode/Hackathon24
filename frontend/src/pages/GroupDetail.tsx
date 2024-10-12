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
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import GroupMemberList from "../components/GroupMemberList";
import { getGroupById, Group, leaveGroup } from "../api/group";

interface GroupDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const GroupDetail: React.FC<GroupDetailProps> = ({ match }) => {
  const [group, setGroup] = React.useState<Group | null>(null);
  const id = match.params.id;

  const router = useIonRouter();

  useEffect(() => {
    getGroupById(id, setGroup);
  }, [id]);

  const getGroupLink = () => {
    return `https://12.viscon-hackathon.ch/group/${id}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Group {group?.name}</IonTitle>
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
            <GroupMemberList members={group?.members} />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Share Link</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{getGroupLink()}</p>
            <IonButton
              onClick={() => {
                navigator.clipboard.writeText(getGroupLink());
              }}
            >
              Copy
            </IonButton>
          </IonCardContent>
        </IonCard>
        <IonButton
          color="danger"
          fill="solid"
          expand="block"
          onClick={async () => {
            await leaveGroup(id);
            // router.push("/groups", "forward");
            history.go(-1);
          }}
        >
          Leave
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GroupDetail;
