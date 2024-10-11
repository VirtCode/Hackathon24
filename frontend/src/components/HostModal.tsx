import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonDatetime,
  IonButtons,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import React, { useRef } from "react";

type HostModalProps = {
  setData: React.Dispatch<React.SetStateAction<{}>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mensas: Mensa[];
};

function HostModal({
  setData,
  isModalOpen,
  setIsModalOpen,
  mensas,
}: HostModalProps) {
  const selectRef = useRef<HTMLIonSelectElement>(null);
  const timeRef = useRef<HTMLIonDatetimeElement>(null);
  const modalRef = useRef<HTMLIonModalElement>(null);

  const confirm = () => {
    let data = {
      hours: timeRef.current?.children[0],
      mensa: selectRef.current?.value,
    };
    console.log(data);
    setData(data);
    setIsModalOpen(false);
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") setData(ev.detail.data);
  };
  return (
    <IonModal ref={modalRef} isOpen={isModalOpen} onWillDismiss={onWillDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Host</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen(false)} color="primary">
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonDatetime
          presentation="time"
          preferWheel={true}
          ref={timeRef}
        ></IonDatetime>
        <IonList>
          <IonItem>
            <IonSelect
              aria-label="Mensa"
              interface="popover"
              placeholder="Select Mensa"
              ref={selectRef}
            >
              {mensas.map((mensa, idx) => (
                <IonSelectOption value={mensa.name.toLowerCase()} key={idx}>
                  {mensa.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton onClick={() => confirm()}>Save</IonButton>
      </IonContent>
    </IonModal>
  );
}

export default HostModal;
