import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import "./AddGroup.css";
import { createGroup, getAllGroupsOfUser, Group } from "../api/group";

interface AddGroupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}

const AddGroup: React.FC<AddGroupProps> = ({
  isOpen,
  setIsOpen,
  setGroups,
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const [name, setName] = useState<string>("");

  return (
    <IonModal isOpen={isOpen} ref={modalRef}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title">New Group</IonTitle>
            <IonButtons slot="end">
              <IonButton
                color="primary"
                onClick={async () => {
                  console.log(name);
                  await createGroup({ name: name });
                  getAllGroupsOfUser(setGroups);
                  setIsOpen(false);
                }}
              >
                Save
              </IonButton>
            </IonButtons>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  setIsOpen(false);
                }}
                color="danger"
              >
                Dismiss
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            label="Group name"
            labelPlacement="floating"
            fill="solid"
            placeholder="Group Name"
            className="input"
            onIonInput={(e: any) => setName(e.detail.value)}
          ></IonInput>
        </IonContent>
      </IonPage>
    </IonModal>
  );
};

export default AddGroup;
