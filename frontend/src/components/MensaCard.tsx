import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

import "./MensaCard.css";

type MensaCardProps = {
  name: string;
  open: boolean;
  image: string;
};

function MensaCard({ name, open, image }: MensaCardProps) {
  return (
    <IonCard>
      <IonCardHeader>
        <img src={image} alt="image" className="image" />
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle color={open ? "success" : "warning"}>
          {open ? "Open" : "Closed"}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default MensaCard;
