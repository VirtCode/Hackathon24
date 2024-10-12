import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Mensa } from "./group";
import { API_DEV } from "./env";

export function getAllMensas(setMensas: Dispatch<SetStateAction<Mensa[]>>) {
  axios
    .get(`${API_DEV}/mensa`)
    .then((res) => setMensas(res.data))
    .catch((err) => {
      console.error(err);
    });
}
