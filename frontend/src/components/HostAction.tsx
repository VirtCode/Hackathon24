import {
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { qrCodeOutline } from "ionicons/icons";
import "./HostAction.css";

type HostActionProps = {
  openScan: () => void;
};

function HostAction({ openScan }: HostActionProps) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="center">
      <IonFabButton className="action-btn">
        <IonIcon icon={qrCodeOutline} onClick={openScan}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}

export default HostAction;
