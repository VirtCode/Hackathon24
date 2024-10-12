import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";
import QrReader from "./QRScanner";

interface ScannerModalProps {
  isScannerOpen: boolean;
  setIsScannerOpen: Dispatch<SetStateAction<boolean>>;
}

const ScannerModal: React.FC<ScannerModalProps> = ({
  isScannerOpen,
  setIsScannerOpen,
}) => {

  const [modalTitle, setModalTitle] = useState<string>("Scan QR Code");
  
  return (
    <IonModal isOpen={isScannerOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{modalTitle}</IonTitle>
          <IonButtons slot="end">
            <IonButton color='primary' onClick={() => setIsScannerOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <QrReader setModalIsOpen={setIsScannerOpen} setModelTitle={setModalTitle}/>
      </IonContent>
    </IonModal>
  );
};

export default ScannerModal;
