import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import Avatar from './Avatar';

interface HeaderProps {
    pageTitle: string,
}

const Header: React.FC<HeaderProps> = ({pageTitle}) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>{pageTitle}</IonTitle>
                <Avatar src="https://www.gravatar.com/avatar/0?d=mp" alt="Avatar"/>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;