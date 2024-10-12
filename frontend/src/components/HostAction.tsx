import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

type HostActionProps = {
  onClick: () => void;
};

function HostAction({ onClick }: HostActionProps) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton id="open-host" onClick={onClick}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}

export default HostAction;
