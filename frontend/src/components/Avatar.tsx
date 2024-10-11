import React from "react";
import {
  IonAvatar,
  IonContent,
  IonItem,
  IonLabel,
  useIonPopover,
} from "@ionic/react";
import "./Avatar.css";
import AvatarPopOver from "./AvatarPopOver";

interface AvatarProps {
  src: string;
  alt?: string;
}


const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const [present, dismiss] = useIonPopover(AvatarPopOver, {
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
            backdropDismiss: true,
          })
        }
      >
        <img src={src} alt={alt || "Avatar"} />
      </IonAvatar>
    </>
  );
};

export default Avatar;
