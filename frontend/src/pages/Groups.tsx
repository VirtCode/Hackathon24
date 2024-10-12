import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Groups.css";
import Header from "../components/Header";
import GroupList from "../components/GroupList";
import { Group } from "../api/group";
import { add } from "ionicons/icons";
import AddGroup from "../components/AddGroup";
import { useState, useEffect } from "react";
import { getAllGroupsOfUser } from "../api/group";

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  useEffect(() => {
    getAllGroupsOfUser(setGroups);
  }, []);

  useIonViewWillEnter(() => {
    getAllGroupsOfUser(setGroups);
  });

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
