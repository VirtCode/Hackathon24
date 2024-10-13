import axios from "axios";
import { API } from "./env";
import { Meetup } from "./group";

export async function getActiveMeetups(): Promise<Array<Meetup>> {
  const response = await axios.get(`${API}/meetup/active`).catch(console.error);
  if (!response || response.status != 200) return [];
  return response.data;
}

export async function endMeetup(meetupId: string) {
  try {
    const response = await axios.post(`${API}/meetup/${meetupId}/end`);
    if (!response.data || response.status != 200) return [];
    return response.data;
  } catch (err) {
    return [];
  }
}
