import { useState, useRef } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonDatetime,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import {
  IonDatetimeCustomEvent,
  DatetimeChangeEventDetail,
  IonSelectCustomEvent,
  SelectChangeEventDetail,
} from "@ionic/core";
import { RouteComponentProps } from "react-router";
import Header from "../components/Header";
import { Group, Mensa } from "../api/group";

interface TableSelectProps extends RouteComponentProps<{ id: string }> {
  groups: Group[];
}

const TableSelect: React.FC<TableSelectProps> = ({ match, groups }) => {
  const tableId = match.params.id;

  const [time, setTime] = useState<string>(new Date().toISOString());
  const [group, setGroup] = useState<string>("");

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
