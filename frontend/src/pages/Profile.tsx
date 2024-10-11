import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton } from '@ionic/react';

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profile</IonTitle>
                    
                </IonToolbar>
                <IonBackButton defaultHref='/home'/>
            </IonHeader>
            <IonContent>
                <h2>Welcome to the Profile Page</h2>
                {/* Add your profile content here */}
            </IonContent>
        </IonPage>
    );
};

export default Profile;