import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Dispatch, SetStateAction } from "react";

interface ScannerModalProps {
  isScannerOpen: boolean;
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  isScannerOpen,
  setIsScannerOpen,
}) => {
  return (
    <IonModal isOpen={isScannerOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scan QR-Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={() => setIsScannerOpen(false)} expand="full">
          Scan
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ScannerModal;
