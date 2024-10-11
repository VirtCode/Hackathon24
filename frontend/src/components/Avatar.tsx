import React from "react";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  useIonPopover,
} from "@ionic/react";
import "./Avatar.css";

interface AvatarProps {
  src: string;
  alt?: string;
}
const Popover = () => (
  <IonContent className="ion-padding">
    <IonItem lines="none" href="#" detail={true} className="item">
      <IonLabel>Profile</IonLabel>
    </IonItem>
    <IonItem lines="none" href="#" detail={true}>
      <IonLabel>Settings</IonLabel>
    </IonItem>
  </IonContent>
);

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const [present, dismiss] = useIonPopover(Popover, {
    onDismiss: (data: any, role: string) => dismiss(data, role),
  });

  return (
    <>
      <IonAvatar
        slot="end"
        className="avatar"
        id="avatar"
        onClick={(e: any) =>
          present({
            event: e,
            onDidDismiss: (e: CustomEvent) =>
              console.log(`Popover dismissed with role: ${e.detail.role}`),
            side: "bottom",
            alignment: "start",
          })
        }
      >
        <img src={src} alt={alt || "Avatar"} />
      </IonAvatar>
    </>
  );
};

export default Avatar;
