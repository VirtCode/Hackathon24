import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Groups.css";
import Header from "../components/Header";
import GroupList, { Group} from "../components/GroupList";

const groups: Group[] = [{ id: 1, name: "Group 1" }, { id: 2, name: "Group 2" }];



const Groups: React.FC = () => {
  return (
    <IonPage>
      <Header pageTitle={"Groups"}/>
      <IonContent fullscreen>
        <GroupList groups={groups}></GroupList>
      </IonContent>
    </IonPage>
  );
};

export default Groups;
