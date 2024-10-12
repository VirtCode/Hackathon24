import axios from "axios";
import { User } from "./user";
import { useState } from "react";

export interface createGroup {
    name: string;
}

export interface Group {
    id: string;
    name: string;
    members: User[];
    sessions: Session[];
}

export interface Session {
    id: string;
    start: string;
    end: string;
    mensa: Mensa;
    group: string;
    tables: Table[];
}

export interface Mensa {
    id: string;
    name: string;
    tables: Table[];
}

export interface Table {
    id : string;
    x: number;
    y: number;
    width: number;
    height: number;
    level: number;
    mensa: string;
}


export function createGroup(group: createGroup) {
    axios.post(`https://12.viscon-hackathon.ch/api/group`, group)
}

export function getAllGroupsOfUser() {
    const [groups, setGroups] = useState<any>(null);

    axios.get(`https://12.viscon-hackathon.ch/api/group/all`)
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    return groups;
}