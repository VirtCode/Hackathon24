import axios from "axios";

import { API } from "./env";
import { Session, Meetup } from "./group";

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

export async function getSession(sessionId: string) {
  try {
    const response = await axios.get(`${API}/session/${sessionId}`);
    if (response) return response.data;
  } catch (err) {
    console.log("getSession:", err);
  }
}
export async function createMeetup(tableId: string, duration: number) {
  try {
    const response = await axios.post(`${API}/meetup`, {
      table: tableId,
      duration: duration,
    });
    if (response) return response.data;
  } catch (err) {
    console.log("createMeetup:", err);
  }
}

export async function getMyActiveMeetup() {
  try {
    const response = await axios.get(`${API}/meetup/own`);
    if (response)
      response.data.forEach((meetup: Meetup) => {
        if (meetup.active) return meetup;
      });
    return undefined;
  } catch (err) {
    console.error(err);
  }
}

export async function getSessionOfGroup(
  groupId: string,
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>
) {
  try {
    const response = await axios.get(`${API}/group/${groupId}/session/active`);
    if (response) setSession(response.data);
  } catch (err) {
    console.log("getSessionOfGroup:", err);
  }
}

export async function addSessionTables(sessionId: string, tables: Array<string>): Promise<Session | undefined> {
  try {
    const response = await axios.put(`${API}/session/${sessionId}/tables`, tables);
    if (response.data) return response.data;
  } catch (err) {
    console.log("addSessionTables:", err);
  }
}

export async function removeSessionTables(sessionId: string, tables: Array<string>): Promise<Session | undefined> {
  try {
    const response = await axios.post(`${API}/session/${sessionId}/tables`, tables);
    if (response.data) return response.data;
  } catch (err) {
    console.log("removeSessionTables:", err);
  }
}
