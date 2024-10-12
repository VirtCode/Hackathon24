import { Dispatch, SetStateAction } from "react";
import axios from "axios";

import { Session } from "./group";
import { API } from "./env";

export function createSession(
  groupId: string,
  sessionInfo: Session,
  setActiveSession: Dispatch<SetStateAction<Session | undefined>>
) {
  axios
    .post(`${API}/group/${groupId}/session/start`, sessionInfo)
    .then((res) => setActiveSession(res.data))
    .catch((err) => console.error(err));
}

export async function getActiveSession(groupId: string) {
  const response = await axios.get(`${API}/group/${groupId}/session/active`);

  return response.data;
}
