import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Welcome to the Settings Page</h2>
                {/* Add your Settings content here */}
            </IonContent>
        </IonPage>
    );
};

export default Settings;