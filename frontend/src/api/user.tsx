import axios from "axios";
import { useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function getCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  axios
    .get(`https://12-direct.viscon-hackathon.ch/user/current`)
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return user;
}
