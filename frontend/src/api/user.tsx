import axios from "axios";
import { useState } from "react";
import { API } from "./env";

export interface User {
  id: string;
  name: string;
  email: string;
}

export async function getCurrentUser() {
  const response = await axios.get(`${API}/user/current`).catch((error) => {
    console.error(error);
  });
  if (!response || response.status != 200) return null;
  return response.data;
}
