import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  useIonViewWillEnter,
  IonToggle,
} from "@ionic/react";
import "./Settings.css";
import { getCurrentUser, User } from "../api/user";

interface SettingsProps {
  user: User;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  // const [user, setUser] = useState<User>({ id: "", name: "", email: "" });

  // useEffect(() => {
  //   getCurrentUser(setUser);
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader className="centred">
            <IonAvatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonCardTitle>{user?.name || "Username"}</IonCardTitle>
            <IonCardSubtitle>{user?.email || "E-Mail"}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Settings</IonCardTitle>
            <IonCardSubtitle>Notification Settings</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonToggle>Receive Push Notifications</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Receive Emails</IonToggle>
              </IonItem>
              <IonItem>
                <IonToggle>Receive Text Messages</IonToggle>
              </IonItem>
            </IonList>
          </IonCardContent>
          <IonCardHeader>
            <IonCardSubtitle>Test</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent></IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
