import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Groups.css";
import Header from "../components/Header";
import GroupList, { Group } from "../components/GroupList";
import { add } from "ionicons/icons";
import AddGroup from "../components/AddGroup";
import { useRef } from "react";

const groups: Group[] = [
  { id: 1, name: "Group 1" },
  { id: 2, name: "Group 2" },
];

const Groups: React.FC = () => {

  return (
    <IonPage>
      <Header pageTitle={"Groups"} />
      <IonContent fullscreen>
        <GroupList groups={groups}></GroupList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="fabButton">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
