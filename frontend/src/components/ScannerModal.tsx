import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Dispatch, SetStateAction } from "react";
import QrReader from "./QRScanner";

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
          <IonButtons slot="end">
            <IonButton color='primary' onClick={() => setIsScannerOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QrReader/>
      </IonContent>
    </IonModal>
  );
};

export default ScannerModal;
