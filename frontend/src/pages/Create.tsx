import { useState, useRef, Dispatch, SetStateAction } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonDatetime,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
  useIonRouter,
  IonRange,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import {
  IonDatetimeCustomEvent,
  DatetimeChangeEventDetail,
  IonSelectCustomEvent,
  SelectChangeEventDetail,
  IonRangeCustomEvent,
  RangeChangeEventDetail,
} from "@ionic/core";
import { RouteComponentProps } from "react-router";
import { getMensaByTable } from "../api/mensas";
import { Group, Mensa, Session, Meetup } from "../api/group";
import {addSessionTables, createMeetup, createSession} from "../api/sessions";

interface TableSelectProps extends RouteComponentProps<{ id: string }> {
  groups: Group[];
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
  setActiveSessions: Dispatch<SetStateAction<Session[]>>;
  setMyMeetup: Dispatch<SetStateAction<Meetup | undefined>>;
  setToastMessage: Dispatch<SetStateAction<string>>;
}

const TableSelect: React.FC<TableSelectProps> = ({
  match,
  groups,
  setIsToastOpen,
  setActiveSessions,
  setMyMeetup,
  setToastMessage,
}) => {
  const router = useIonRouter();
  const tableId = match.params.id;

  const [time, setTime] = useState<string>(new Date().toISOString());
  const [group, setGroup] = useState<string>("");
  const [duration, setDuration] = useState(30);

  const confirm = async () => {
    const mensa = await getMensaByTable(tableId);

    if (!mensa) console.log("Mensa is undefined");

    let session = {
      start: time,
      duration: duration,
      mensa: mensa.id,
    };
    if (group == "open") {
      let data = await createMeetup(tableId, duration);
      setMyMeetup(data);
      setToastMessage("Opened Meetup!");
      router.push("/home", "root", "replace");
    } else {
      let data = await createSession(group, session);
      data = await createSession(group, session);
      // add table
      data = await addSessionTables(data.id, [tableId]);
      setToastMessage("Created Session!");
      router.push(`/session/${data.id}`)
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>New Session</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
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
                <IonSelectOption value="open" key={0}>
                  <IonLabel className="open-meetup">Open Meetup</IonLabel>
                </IonSelectOption>
              }
              {groups.map((group, idx) => (
                <IonSelectOption value={group.id} key={idx + 1}>
                  {group.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonRange
              labelPlacement="start"
              label="Duration"
              snaps={true}
              ticks={true}
              pin={true}
              pinFormatter={(val) => `${val} min`}
              max={60}
              min={15}
              step={5}
              onIonChange={(
                ev: IonRangeCustomEvent<RangeChangeEventDetail>
              ) => {
                let duration = ev.detail.value as number;
                setDuration(duration);
              }}
            ></IonRange>
          </IonItem>
        </IonList>
        <IonButton
          onClick={() => confirm()}
          expand="full"
          disabled={group == ""}
        >
          Create Session
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TableSelect;
