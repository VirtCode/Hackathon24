import {
  IonAlert,
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
  IonIcon,
  IonPage,
  IonTabs,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonRouter,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import GroupMemberList from "../components/GroupMemberList";
import {
  getGroupById,
  Group,
  joinGroup,
  leaveGroup,
  updateGroup,
  userInGroup,
} from "../api/group";
import { clipboard, create, createOutline } from "ionicons/icons";
import { User } from "../api/user";

interface GroupDetailProps
  extends RouteComponentProps<{
    id: string;
  }> {
  user: User;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ match, user }) => {
  const [group, setGroup] = React.useState<Group>({
    id: "",
    name: "",
    members: [],
    sessions: [],
  });
  const id = match.params.id;

  const router = useIonRouter();

  useEffect(() => {
    getGroupById(id, setGroup);
    // console.log(group, user);
  }, [id]);

  const getGroupLink = () => {
    return `https://12.viscon-hackathon.ch/group/${id}`;
  };

  const [present] = useIonToast();

                  const presentToast = (
                    position: "top" | "middle" | "bottom"
                  ) => {
                    present({
                      message: "Not changed -> Name is empty",
                      duration: 1500,
                      position: position,
                      positionAnchor: "tabs",
                    });
                  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Group {group?.name}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/groups" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              disabled={!userInGroup(group, user)}
              onClick={() => {
                console.log("edit");
              }}
              id="openAlert"
            >
              <IonIcon icon={createOutline} slot="icon-only"></IonIcon>
            </IonButton>
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
              id="open-toast"
              onClick={() => {
                navigator.clipboard.writeText(getGroupLink());
              }}
            >
              Copy
            </IonButton>
            <IonToast
              trigger="open-toast"
              message="Copied to Clipboard"
              duration={2000}
              position="bottom"
              positionAnchor="tabs"
              icon={clipboard}
            ></IonToast>
          </IonCardContent>
        </IonCard>
        {userInGroup(group, user) ? (
          <IonButton
            color="danger"
            fill="solid"
            expand="block"
            onClick={async () => {
              await leaveGroup(id);
              router.push("/groups", "forward");
            }}
          >
            Leave
          </IonButton>
        ) : null}
        {!userInGroup(group, user) ? (
          <IonButton
            color="primary"
            fill="solid"
            expand="block"
            onClick={async () => {
              await joinGroup(group.id);

              await getGroupById(id, setGroup);
              console.log(group);
            }}
          >
            Join
          </IonButton>
        ) : null}
        <IonAlert
          trigger="openAlert"
          header="Change Group Name"
          buttons={[
            {
              text: "Save",
              cssClass: "alert-button-confirm",
              handler: async (alertData) => {
                if (alertData.name !== "") {
                  console.log(alertData.name);
                  await updateGroup(group.id, alertData.name);
                  getGroupById(id, setGroup);
                  let nameInput = document.getElementById(
                    "name"
                  ) as HTMLInputElement;
                  nameInput.value = "";
                } else {
                  
                  presentToast("bottom");
                }
              },
            },
            { text: "Dismiss", cssClass: "alert-button-cancel" },
          ]}
          inputs={[
            {
              id: "name",
              name: "name",
              placeholder: group.name,
            },
          ]}
        ></IonAlert>

        {/* <IonButton onClick={() => console.log(userInGroup(group, user), user, group)}>Default</IonButton> */}
      </IonContent>
    </IonPage>
  );
};

export default GroupDetail;
