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
} from "@ionic/react";
import {
  IonDatetimeCustomEvent,
  DatetimeChangeEventDetail,
  IonSelectCustomEvent,
  SelectChangeEventDetail,
} from "@ionic/core";
import { RouteComponentProps } from "react-router";
import Header from "../components/Header";
import { getMensaByTable } from "../api/mensas";
import { Group, Mensa, Session } from "../api/group";
import { createSession } from "../api/sessions";

interface TableSelectProps extends RouteComponentProps<{ id: string }> {
  groups: Group[];
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
  setActiveSessions: Dispatch<SetStateAction<Session[]>>;
}

const TableSelect: React.FC<TableSelectProps> = ({
  match,
  groups,
  setIsToastOpen,
  setActiveSessions,
}) => {
  const router = useIonRouter();
  const tableId = match.params.id;

  const [time, setTime] = useState<string>(new Date().toISOString());
  const [group, setGroup] = useState<string>("");

  const confirm = async () => {
    const mensa = await getMensaByTable(tableId);

    console.log("mensa", mensa);

    let session = {
      start: time,
      duration: 30,
      mensa: mensa.id,
    };
    let data = await createSession(group, session);
    if (data) {
      setIsToastOpen(true);
      setActiveSessions((activeSessions) => [...activeSessions, data]);
    }
    router.push("/home", "root", "replace");
  };

  return (
    <IonPage>
      <Header pageTitle="New Session"></Header>
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
          disabled={group == ""}
        >
          Create Session
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TableSelect;
