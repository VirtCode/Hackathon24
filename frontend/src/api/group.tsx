import axios from "axios";
import { User } from "./user";

import { API } from "./env";

export interface GroupCreate {
  name: string;
}

export interface Group {
  id: string;
  name: string;
  created: string;
  members: User[];
}

export interface SessionCreate {
  start: string;
  duration: number;
  mensa: Mensa;
}

export interface Session {
  id?: string;
  active: boolean;
  pending: boolean;
  start: string;
  duration: number;
  mensa: Mensa;
  group?: Group;
  tables?: Table[];
}

export interface Mensa {
  id: string;
  name: string;
  lat: number;
  lng: number;
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

export interface Meetup {
  id: string;
  start: string;
  end: string;
  ended: boolean;
  owner: User;
  table: Table;
  mensa: Mensa;
  active: boolean
}

export async function createGroup(group: GroupCreate) {
  await axios.post(`${API}/group`, group).then((response) => {
    return {
      id: response.data.id,
      name: response.data.name,
      members: response.data.members,
      sessions: response.data.sessions,
    };
  });
}

export async function getAllGroupsOfUser() {
  let res = await axios.get(`${API}/group/all`).catch((error) => {
    console.error(error);
  });
  if (!res || res.status != 200) return null;
  return res.data;
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

export function userInGroup(group: Group, user: User): boolean {
  let isMember: boolean = false;
  // test
  group.members.forEach((member) => {
    if (member.id === user.id) {
      isMember = true;
    }
  });
  return isMember;
}

export async function joinGroup(id: string) {
  await axios.post(`${API}/group/${id}/join`);
}

export async function updateGroup(id: string, name: string) {
  await axios.put(`${API}/group/${id}`, { name: name });
}
