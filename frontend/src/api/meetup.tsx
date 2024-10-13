import axios from "axios";
import {API} from "./env";
import {Meetup} from "./group";

export async function getActiveMeetups(): Promise<Array<Meetup>> {
    console.warn(API)
    const response = await axios
        .get(`${API}/meetup/active`)
        .catch(console.error);
    if (!response || response.status != 200) return [];
    return response.data;
}
