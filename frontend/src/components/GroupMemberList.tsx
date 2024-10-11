import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

export interface Member {
    id: number;
    name: string;
}

export interface GroupMemberListProps {
    members: Member[];
}

const GroupMemberList: React.FC<GroupMemberListProps> = ({ members }) => {
    return (
        <IonList lines='full'>
            {members.map(member => (
                <IonItem key={member.id}>
                    <IonLabel>{member.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    );
};

export default GroupMemberList;