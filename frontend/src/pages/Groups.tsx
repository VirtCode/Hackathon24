import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
import "./Groups.css";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import { add } from "ionicons/icons";
import AddGroup from "../components/AddGroup";
import { useState, useEffect } from "react";
import { Group } from "../api/group";

interface GroupsProps {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const Groups: React.FC<GroupsProps> = ({ groups, setGroups }) => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  return (
    <IonPage>
      <Header pageTitle={"Groups"} />
      <IonContent fullscreen>
        <GroupList groups={groups}></GroupList>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton
            id="fabButton"
            onClick={() => setShowAddGroupModal(true)}
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <AddGroup
          isOpen={showAddGroupModal}
          setIsOpen={setShowAddGroupModal}
          groups={groups}
          setGroups={setGroups}
        ></AddGroup>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
