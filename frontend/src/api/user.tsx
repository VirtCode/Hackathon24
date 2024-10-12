import axios from "axios";
import { useState } from "react";
import { apiPath } from "./environment";

export interface User {
  id: number;
  name: string;
  email: string;
}

export function getCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  axios
    .get(apiPath + "/user/current")
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  return user;
}
