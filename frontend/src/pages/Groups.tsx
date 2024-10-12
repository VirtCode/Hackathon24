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
<<<<<<< HEAD
import { getAllGroupsOfUser } from "../api/group";
import { useHistory } from "react-router-dom";
=======
import { Group } from "../api/group";
>>>>>>> e1683b5287bcd03a0b1e215cc46e8ae17affbc50

interface GroupsProps {
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const Groups: React.FC<GroupsProps> = ({ groups, setGroups }) => {
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    history.listen((location) => {
    getAllGroupsOfUser(setGroups);})
  }, [history]);

<<<<<<< HEAD
  useEffect(() => {
    getAllGroupsOfUser(setGroups);
  }, [showAddGroupModal]);

  useIonViewWillEnter(() => {
    getAllGroupsOfUser(setGroups);
  });

=======
>>>>>>> e1683b5287bcd03a0b1e215cc46e8ae17affbc50
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
          setGroups={setGroups}
        ></AddGroup>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
