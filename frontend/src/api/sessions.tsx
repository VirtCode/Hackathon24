import { Dispatch, SetStateAction } from "react";
import axios from "axios";

import { Session } from "./group";
import { API_DEV } from "./env";

export function createSession(
  groupId: string,
  setSession: Dispatch<SetStateAction<Session>>
) {
  axios
    .post(`${API_DEV}/group/${groupId}/session/start`)
    .then((res) => setSession(res.data))
    .catch((err) => console.error(err));
}

export async function getActiveSession(groupId: string) {
  const response = await axios.get(
    `${API_DEV}/group/${groupId}/session/active`
  );

  return response.data;
}
