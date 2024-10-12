import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  Pin,
} from "@vis.gl/react-google-maps";
import "./Map.css";
import { Mensa } from "../api/group";

const API_KEY = "AIzaSyBKebKvbRFYo64Ernvats-FX4v445xlW7Y";
const DEFAULT_LAT = 47.37643604499102;
const DEFAULT_LONG = 8.547644304932101;

interface MapProps {
  mensas: Mensa[];
}

const Map: React.FC<MapProps> = ({ mensas }) => {
  const renderMensaMarker = (mensa: Mensa, idx: React.Key) => {
    return (
      <IonItem routerLink={`/mensa/${mensa.id}`} key={idx}>
        <AdvancedMarker
          position={{
            lat: mensa.lat | DEFAULT_LAT,
            lng: mensa.lng | DEFAULT_LONG,
          }}
          title={mensa.name}
          onClick={() => console.log(mensa.name)}
        >
          <Pin
            background={"#616F25"}
            borderColor={"#88993c"}
            glyphColor={"white"}
          />
        </AdvancedMarker>
      </IonItem>
    );
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <APIProvider apiKey={API_KEY}>
          <GoogleMap
            defaultCenter={{ lat: DEFAULT_LAT, lng: DEFAULT_LONG }}
            defaultZoom={16}
            mapId={"default"}
          >
            {mensas.map((mensa, idx) => renderMensaMarker(mensa, idx))}
          </GoogleMap>
        </APIProvider>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Map;
