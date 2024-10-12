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
import { createSession } from "../api/sessions";

type HostModalProps = {
  setActiveSessions: Dispatch<SetStateAction<Session[]>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  mensas: Mensa[];
  groups: Group[];
  isToastOpen: boolean;
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
};

function HostModal({
  isModalOpen,
  setIsModalOpen,
  mensas,
  groups,
  isToastOpen,
  setIsToastOpen,
  setActiveSessions,
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

  const confirm = async () => {
    let session = {
      start: time,
      duration: 30,
      mensa: mensa,
    };
    let data: Session = await createSession(group, session);
    if (data) setIsToastOpen(true);
    setActiveSessions((activeSessions) => [...activeSessions, data]);
    setIsModalOpen(false);
  };

  return (
    <IonModal ref={modalRef} isOpen={isModalOpen}>
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
