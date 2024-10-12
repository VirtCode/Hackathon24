import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Mensa } from "./group";
import { API } from "./env";

export async function getAllMensas(): Promise<Mensa[]> {
  const response = await axios.get(`${API}/mensa`).catch((err) => {
    console.error(err);
  });
  if (!response || response.status != 200) return [];
  return response.data;
}

export async function getMensaLayout(mensaId: string) {
  const response = await axios
    .get(`${API}/mensa/${mensaId}/layout`)
    .catch(console.error);
  if (!response || response.status != 200) return "";
  return response.data;
}
