import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/react';
import Avatar from '../components/Avatar';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref='/home'></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
            <Avatar src="https://www.gravatar.com/avatar/0?d=mp" alt="Avatar"/>
            </IonContent>
        </IonPage>
    );
};

export default Settings;