import React from 'react';
import { IonAvatar } from '@ionic/react';

interface AvatarProps {
    src: string;
    alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
    return (
        <IonAvatar>
            <img src={src} alt={alt || 'Avatar'} />
        </IonAvatar>
    );
};

export default Avatar;