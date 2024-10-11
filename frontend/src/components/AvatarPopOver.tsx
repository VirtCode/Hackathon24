import {
  IonContent,
  IonItem,
  IonLabel,
} from "@ionic/react";

const AvatarPopOver = () => {

  return (
    <IonContent className="ion-padding">
      <IonItem lines="none" detail={true} className="item" routerLink="/profile">
        <IonLabel>Profile</IonLabel>
      </IonItem>
      <IonItem lines="none" href="#" detail={true} routerLink="/settings">
        <IonLabel>Settings</IonLabel>
      </IonItem>
    </IonContent>
  );
};

export default AvatarPopOver;
