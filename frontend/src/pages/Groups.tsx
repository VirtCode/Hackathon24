import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Groups.css";
import Header from "../components/Header";
import GroupList, { Group } from "../components/GroupList";
import { add } from "ionicons/icons";
import AddGroup from "../components/AddGroup";
import { useRef, useState } from "react";
import { getAllGroupsOfUser } from "../api/group";
import QrReader from "../components/QRScanner";

const groupsDummy: Group[] = [
  { id: 1, name: "Group 1" },
  { id: 2, name: "Group 2" },
];


const Groups: React.FC = () => {
  const groups = getAllGroupsOfUser();

  useIonViewWillEnter(() => {
    console.log(groups);
  });


  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  return (
    <IonPage>
      <Header pageTitle={"Groups"} />
      <IonContent fullscreen>
        <GroupList groups={groupsDummy}></GroupList>
        
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="fabButton" onClick={() => setShowAddGroupModal(true)}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <AddGroup isOpen={showAddGroupModal} setIsOpen={setShowAddGroupModal}></AddGroup>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
