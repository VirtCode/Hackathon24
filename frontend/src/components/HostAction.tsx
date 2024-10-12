import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { add, radioOutline, qrCodeOutline } from "ionicons/icons";

type HostActionProps = {
  openModal: () => void;
  openScan: () => void;
};

function HostAction({ openModal, openScan }: HostActionProps) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
      <IonFabList side="start">
        <IonFabButton onClick={openModal}>
          <IonIcon icon={radioOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>
      <IonFabList side="end">
        <IonFabButton onClick={openScan}>
          <IonIcon icon={qrCodeOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
}

export default HostAction;
