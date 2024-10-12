import axios from "axios";

export interface createGroup {
    name: string;
}

export function createGroup(group: createGroup) {
    axios.post(`https://12.viscon-hackathon.ch/api/group`, group)
}