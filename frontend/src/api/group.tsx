import axios from "axios";
import { User } from "./user";
import { useState } from "react";

import { API_DEV } from "./env";

export interface GroupCreate {
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
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  level: number;
  mensa: string;
}

export function createGroup(group: GroupCreate) {
  axios.post(`${API_DEV}/groups`, group);
}

export function getAllGroupsOfUser(
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) {
  axios
    .get(`${API_DEV}/group/all`)
    .then((response) => {
      setGroups(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
