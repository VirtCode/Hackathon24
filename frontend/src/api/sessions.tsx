import { Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";

import { Session } from "./group";
import { API } from "./env";

export async function createSession(groupId: string, sessionInfo: any) {
  let res = await axios
    .post(`${API}/group/${groupId}/session/start`, sessionInfo)
    .catch((err) => console.error(err));

  if (!res || res.status != 200) return null;
  return res.data;
}

export async function getActiveSession(groupId: string) {
  const response = await axios.get(`${API}/group/${groupId}/session/active`);
  if (response.status == 404) return null;
  return response.data;
}
