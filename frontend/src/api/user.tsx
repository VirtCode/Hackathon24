import axios from "axios";
import { useState } from "react";
import { API_DEV } from "./env";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function getCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  axios
    .get(`${API_DEV}/user/current`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return user;
}
