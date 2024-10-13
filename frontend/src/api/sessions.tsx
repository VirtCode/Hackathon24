import axios from "axios";

import { API } from "./env";

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
