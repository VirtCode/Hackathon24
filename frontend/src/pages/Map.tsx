import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  APIProvider,
  ControlPosition,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";
import "./Map.css";

const API_KEY = "AIzaSyBKebKvbRFYo64Ernvats-FX4v445xlW7Y";
const DEFAULT_LAT = 47.37643604499102;
const DEFAULT_LONG = 8.547644304932101;

type MapProps = {
  mensas: Mensa[];
};

const Map: React.FC<MapProps> = ({ mensas }) => {
  const renderMensaMarker = (mensa: Mensa) => {
    return <Marker position={mensa.position} label={mensa.name} />;
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
          >
            {mensas.map((mensa) => renderMensaMarker(mensa))}
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
