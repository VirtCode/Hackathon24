import axios from "axios";
import { API } from "./env";

export interface User {
  id: string;
  name: string;
  email: string;
  joined: Date;
}

export async function getCurrentUser() {
  try {
    const response = await axios.get(`${API}/user/current`);
    if (response)
      return {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        joined: response.data.joined,
      };
  } catch (err) {
    console.log("getCurrentUser:", err);
  }
}
