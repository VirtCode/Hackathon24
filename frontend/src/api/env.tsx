export const API =
  import.meta.env.VITE_PROD == "true"
    ? "https://12.viscon-hackathon.ch/api"
    : "http://12-direct.viscon-hackathon.ch:8888";
