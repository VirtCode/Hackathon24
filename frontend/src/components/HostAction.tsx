import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { add, radioOutline, qrCodeOutline } from "ionicons/icons";
import "./HostAction.css";

type HostActionProps = {
  openModal: () => void;
  openScan: () => void;
};

function HostAction({ openModal, openScan }: HostActionProps) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton className="action-btn">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
      <IonFabList side="start">
        <IonFabButton onClick={openModal} className="fab-btn">
          <IonIcon icon={radioOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>
      <IonFabList side="end">
        <IonFabButton onClick={openScan} className="fab-btn">
          <IonIcon icon={qrCodeOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
}

export default HostAction;
