import axios from "axios";

import { API } from "./env";
import { Session } from "./group";

export async function createSession(groupId: string, sessionInfo: any) {
  try {
    const response = await axios.post(
      `${API}/group/${groupId}/session/start`,
      sessionInfo
    );

    if (response) return response.data;
  } catch (err) {
    console.log("createSession:", err);
  }
}

export async function getActiveSession(groupId: string) {
  try {
    const response = await axios.get(`${API}/group/${groupId}/session/active`);
    if (response) return response.data;
  } catch (err) {
    console.log("getActiveSession:", err);
  }
}

export async function getSessionOfGroup(groupId: string, setSession: React.Dispatch<React.SetStateAction<Session | undefined>>) {
  try {
    const response = await axios.get(`${API}/group/${groupId}/session/active`);
    console.log("getSessionOfGroup:", response);
    if (response) setSession(response.data);
  } catch (err) {
    console.log("getSessionOfGroup:", err);
  }
}