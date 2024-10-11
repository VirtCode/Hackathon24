import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const Header: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>My App</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;