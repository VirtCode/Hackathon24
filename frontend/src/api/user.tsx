import axios from "axios";
import { useState } from "react";
import { API_DEV } from "./env";

export interface User {
  id: string;
  name: string;
  email: string;
}

export function getCurrentUser(setUser: React.Dispatch<React.SetStateAction<User>>) {

  axios
    .get(`${API_DEV}/user/current`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
