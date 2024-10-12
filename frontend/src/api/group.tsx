import axios from "axios";
import { User } from "./user";

import { API } from "./env";

export interface GroupCreate {
  name: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  sessions: Session[];
}

export interface SessionCreate {
  start: string;
  mensa: Mensa;
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
  lat: number;
  lng: number;
  image: string;
  tables: Table[];
  open: boolean;
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
  axios.post(`${API}/group`, group).then((response) => {
    return {
      id: response.data.id,
      name: response.data.name,
      members: response.data.members,
      sessions: response.data.sessions,
    };
  });
}

export function getAllGroupsOfUser(
  setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) {
  axios
    .get(`${API}/group/all`)
    .then((response) => {
      setGroups(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getGroupById(
  id: string,
  setGroup: React.Dispatch<React.SetStateAction<Group>>
) {
  axios
    .get(`${API}/group/${id}`)
    .then((response) => {
      setGroup(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function leaveGroup(id: string | undefined) {
  axios.post(`${API}/group/${id}/leave`);
}
