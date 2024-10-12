import { IonPage, IonContent, IonItem } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import Header from "../components/Header";

interface TableSelectProps extends RouteComponentProps<{ id: string }> {}

const TableSelect: React.FC<TableSelectProps> = ({ match }) => {
  const tableId = match.params.id;

  return (
    <IonPage>
      <Header pageTitle="Table Select"></Header>
      <IonContent>
        <IonItem>Your Table{tableId}</IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TableSelect;
