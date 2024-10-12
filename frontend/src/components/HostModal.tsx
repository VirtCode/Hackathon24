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
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import {
  DatetimeChangeEventDetail,
  OverlayEventDetail,
  IonDatetimeCustomEvent,
} from "@ionic/core/components";
import React, { useRef, useState } from "react";
import { Group, Mensa } from "../api/group";

type HostModalProps = {
  setData: React.Dispatch<React.SetStateAction<{}>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mensas: Mensa[];
  groups: Group[];
};

function HostModal({
  setData,
  isModalOpen,
  setIsModalOpen,
  mensas,
  groups,
}: HostModalProps) {
  const [time, setTime] = useState<string>();
  const selectMensaRef = useRef<HTMLIonSelectElement>(null);
  const selectGroupRef = useRef<HTMLIonSelectElement>(null);
  const modalRef = useRef<HTMLIonModalElement>(null);

  const confirm = () => {
    let data = {
      time: time,
      mensa: selectMensaRef.current?.value,
      group: selectGroupRef.current?.value,
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
          <IonTitle>Host Session</IonTitle>
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
          onIonChange={(
            ev: IonDatetimeCustomEvent<DatetimeChangeEventDetail>
          ) => {
            setTime(ev.target.value as string);
          }}
        ></IonDatetime>
        <IonList>
          <IonItem>
            <IonSelect
              aria-label="Mensa"
              interface="popover"
              placeholder="Select Mensa"
              ref={selectMensaRef}
            >
              {mensas.map((mensa, idx) => (
                <IonSelectOption value={mensa.name.toLowerCase()} key={idx}>
                  {mensa.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect
              aria-label="Group"
              interface="action-sheet"
              placeholder="Select Group"
            >
              {groups.map((group, idx) => (
                <IonSelectOption value={group.name} key={idx}>
                  {group.name}
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
