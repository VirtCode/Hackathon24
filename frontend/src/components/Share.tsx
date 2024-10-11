import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

function Share() {
  return (
    <IonFab>
      <IonFabButton>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
}

export default Share;
