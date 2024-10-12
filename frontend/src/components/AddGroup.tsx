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
import { createGroup } from "../api/group";

interface AddGroupProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}




const AddGroup: React.FC<AddGroupProps> = ({isOpen, setIsOpen}) => {
    const modalRef = useRef<HTMLIonModalElement>(null);

    const [name, setName] = useState<string>("");

  return (
    <IonModal isOpen={isOpen} ref={modalRef}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="title" >New Group</IonTitle>
            <IonButtons slot="end" >
               <IonButton color="primary" onClick={() => {
                  createGroup({name: name});
                  setIsOpen(false);
               }}>Save</IonButton>
            </IonButtons>
            <IonButtons slot="start">
              <IonButton onClick={() => {setIsOpen(false)}} color='danger'>Dismiss</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
        <IonInput label="Group name" labelPlacement="floating" fill="solid" placeholder="Group Name" className="input" onIonChange={(e: any)=> setName(e)}></IonInput>
        </IonContent>
      </IonPage>
    </IonModal>
  );
};

export default AddGroup;
