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
  IonTabs,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import GroupMemberList from "../components/GroupMemberList";
import { getGroupById, Group, leaveGroup, userInGroup } from "../api/group";
import { clipboard } from "ionicons/icons";
import { User } from "../api/user";

interface GroupDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {
    user: User;
  }

const GroupDetail: React.FC<GroupDetailProps> = ({ match, user }) => {
  const [group, setGroup] = React.useState<Group>({ id: "", name: "", members: [], sessions: [] });
  const id = match.params.id;

  const router = useIonRouter();

  useEffect(() => {
    getGroupById(id, setGroup);
    // console.log(group, user);
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
            <IonButton id="open-toast"
              onClick={() => {
                navigator.clipboard.writeText(getGroupLink());
              }}
            >
              Copy
            </IonButton>
            <IonToast trigger="open-toast" message="Copied to Clipboard" duration={2000} position="bottom" positionAnchor="tabs" icon={clipboard}></IonToast>
          </IonCardContent>
        </IonCard>
        {userInGroup(group, user) ? <IonButton
          color="danger"
          disabled={!userInGroup(group, user)}
          fill="solid"
          expand="block"
          onClick={async () => {
            await leaveGroup(id);
            // router.push("/groups", "forward");
            history.go(-1);
          }}
        >
          Leave
        </IonButton>: null}
        {!userInGroup(group, user) ? <IonButton
          color="primary"
          disabled={!userInGroup(group, user)}
          fill="solid"
          expand="block"
          onClick={async () => {
            console.log("Joined");
          }}
        >
          Join
        </IonButton>: null}

        
        {/* <IonButton onClick={() => console.log(userInGroup(group, user), user, group)}>Default</IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default GroupDetail;
