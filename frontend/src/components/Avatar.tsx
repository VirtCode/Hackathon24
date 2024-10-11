import React from "react";
import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  useIonPopover,
} from "@ionic/react";
import "./Avatar.css";

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {

  return (
    <>
      <IonButtons slot="end">
        <IonButton routerLink="/settings">
          <IonAvatar slot="end" className="avatar" id="avatar">
            <img src={src} alt={alt || "Avatar"} />
          </IonAvatar>
        </IonButton>
      </IonButtons>
    </>
  );
};

export default Avatar;
