import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonRouterLink,
} from "@ionic/react";

import { Mensa } from "../api/group";

import "./MensaCard.css";

type MensaCardProps = {
  mensa: Mensa;
};

function MensaCard({ mensa }: MensaCardProps) {
  return (
    <IonCard>
      <IonCardHeader>
        <img src={`${mensa.id}.jpg`} alt="image" className="image" />
        <IonRouterLink routerLink={`/mensa/${mensa.id}`}>
          <IonCardTitle>{mensa.name}</IonCardTitle>
        </IonRouterLink>
        <IonCardSubtitle color={mensa.open ? "success" : "warning"}>
          {mensa.open ? "Open" : "Closed"}
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default MensaCard;
