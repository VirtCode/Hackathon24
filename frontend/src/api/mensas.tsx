import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Mensa } from "./group";
import { API } from "./env";

export async function getAllMensas() {
  try {
    const response = await axios.get(`${API}/mensa`).catch((err) => {
      console.error(err);
    });
    if (response) return response.data;
  } catch (err) {
    console.log("getAllMensas:", err);
  }
}

export async function getMensaLayout(mensaId: string) {
  try {
    const response = await axios
      .get(`${API}/mensa/${mensaId}/layout`)
      .catch(console.error);
    if (response) return response.data;
  } catch (err) {
    console.log("getMensaLayout:", err);
  }
}

export async function getMensaByTable(tableId: string) {
  try {
    const response = await axios
      .get(`/mensa/table/${tableId}`)
      .catch((err) => console.error(err));

    if (response) return response.data;
  } catch (err) {
    console.log("getMensaByTable:", err);
  }
}
