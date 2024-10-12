import React from 'react';
import { IonList, IonItem, IonLabel, useIonViewWillEnter } from '@ionic/react';
import { getAllGroupsOfUser } from '../api/group';

export interface Group {
    id: number;
    name: string;
}

export interface GroupListProps {
    groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
    // console.log(getAllGroupsOfUser());

    return (
        <IonList lines='full'>
            {groups.map(group => (
                <IonItem key={group.id} detail={true} routerLink={`group/${group.id}`}>
                    <IonLabel>{group.name}</IonLabel>
                </IonItem>
            ))}
        </IonList>
    );
};

export default GroupList;