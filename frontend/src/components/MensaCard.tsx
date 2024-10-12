import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonRouterLink,
} from "@ionic/react";

import "./MensaCard.css";

type MensaCardProps = {
  id: number;
  name: string;
  open: boolean;
  image: string;
};

function MensaCard({ name, open, image, id }: MensaCardProps) {
  return (
    <IonCard>
      <IonCardHeader>
        <img src={image} alt="image" className="image" />
        <IonRouterLink routerLink={`/mensa/${id}`}>
          <IonCardTitle>{name}</IonCardTitle>
        </IonRouterLink>
        <IonCardSubtitle color={open ? "success" : "warning"}>
          {open ? "Open" : "Closed"}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default MensaCard;
