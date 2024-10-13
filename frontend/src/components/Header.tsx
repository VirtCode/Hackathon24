import React from 'react';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import Avatar from './Avatar';

interface HeaderProps {
    pageTitle: string,
    main?: boolean
}

const Header: React.FC<HeaderProps> = ({pageTitle, main}) => {

    let header = <IonTitle>{pageTitle}</IonTitle>;
    if (main) header = <IonTitle>Meet<sub>2</sub>Eat</IonTitle>

    return (
        <IonHeader>
            <IonToolbar>
                {header}
                <Avatar src="https://www.gravatar.com/avatar/0?d=mp" alt="Avatar"/>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
