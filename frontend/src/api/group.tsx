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
  end: string;
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
  active: boolean;
}

export async function createGroup(group: GroupCreate) {
  try {
    const response = await axios.post(`${API}/group`, group);
    return {
      id: response.data.id,
      name: response.data.name,
      members: response.data.members,
      sessions: response.data.sessions,
    };
  } catch (err) {
    console.log("createGroup:", err);
  }
}

export async function getAllGroupsOfUser() {
  try {
    let response = await axios.get(`${API}/group/all`);
    return response.data;
  } catch (err) {
    console.log("getAllGroupsOfUser:", err);
  }
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

export async function leaveGroup(id: string | undefined) {
  try {
    await axios.post(`${API}/group/${id}/leave`);
  } catch (err) {
    console.log("leaveGroup:", err);
  }
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
  try {
    await axios.post(`${API}/group/${id}/join`);
  } catch (err) {
    console.log("joinGroup:", err);
  }
}

export async function updateGroup(id: string, name: string) {
  try {
    await axios.put(`${API}/group/${id}`, { name: name });
  } catch (err) {
    console.log("updateGroup:", err);
  }
}
