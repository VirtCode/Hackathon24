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
  IonToast,
} from "@ionic/react";
import {
  DatetimeChangeEventDetail,
  OverlayEventDetail,
  IonDatetimeCustomEvent,
  IonSelectCustomEvent,
  SelectChangeEventDetail,
} from "@ionic/core/components";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Group, Mensa, Session } from "../api/group";

type HostModalProps = {
  setData: Dispatch<SetStateAction<{}>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mensas: Mensa[];
  groups: Group[];
  setSessions: Dispatch<SetStateAction<Session[]>>;
  isToastOpen: boolean;
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
};

function HostModal({
  setData,
  isModalOpen,
  setIsModalOpen,
  mensas,
  groups,
  isToastOpen,
  setIsToastOpen,
}: HostModalProps) {
  const [time, setTime] = useState<string>(new Date().toISOString());
  const [mensa, setMensa] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const modalRef = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    setTime(new Date().toISOString());
  });

  useEffect(() => {
    if (isToastOpen) {
      setMensa("");
      setGroup("");
    }
  }, [isToastOpen]);

  const confirm = () => {
    let data = {
      time: time,
      mensa: mensa,
      group: group,
    };
    console.log(data);
    setData(data);
    setIsModalOpen(false);
    setIsToastOpen(true);
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
          defaultValue={time}
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
              onIonChange={(
                ev: IonSelectCustomEvent<SelectChangeEventDetail>
              ) => setMensa(ev.detail.value)}
            >
              {mensas.map((mensa, idx) => (
                <IonSelectOption value={mensa.id} key={idx}>
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
              onIonChange={(
                ev: IonSelectCustomEvent<SelectChangeEventDetail>
              ) => {
                setGroup(ev.detail.value);
              }}
            >
              {
                <IonSelectOption value="open" key={0} className="open-session">
                  Open Meet
                </IonSelectOption>
              }
              {groups.map((group, idx) => (
                <IonSelectOption value={group.id} key={idx + 1}>
                  {group.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem></IonItem>
        </IonList>
        <IonButton
          onClick={() => confirm()}
          expand="full"
          disabled={mensa == "" || group == ""}
        >
          Save
        </IonButton>
      </IonContent>
    </IonModal>
  );
}

export default HostModal;
