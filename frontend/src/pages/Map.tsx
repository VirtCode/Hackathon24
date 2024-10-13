import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonRouterLink,
  useIonRouter,
} from "@ionic/react";
import {
  useAdvancedMarkerRef,
  AdvancedMarker,
  InfoWindow,
  APIProvider,
  Map as GoogleMap,
  Pin,
} from "@vis.gl/react-google-maps";
import "./Map.css";
import { Mensa } from "../api/group";
import Header from "../components/Header";
import { useState } from "react";

const API_KEY = "AIzaSyBKebKvbRFYo64Ernvats-FX4v445xlW7Y";
const DEFAULT_LAT = 47.37643604499102;
const DEFAULT_LONG = 8.547644304932101;

interface MapProps {
  mensas: Mensa[];
}

const Map: React.FC<MapProps> = ({ mensas }) => {
  const renderMensaMarker = (mensa: Mensa, idx: React.Key) => {
    const router = useIonRouter();

    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const toggleInfo = () => {
      setInfoWindowShown(!infoWindowShown);
    };
    return (
      <AdvancedMarker
        position={{
          lat: mensa.lat,
          lng: mensa.lng,
        }}
        title={mensa.name}
        onClick={toggleInfo}
        ref={markerRef}
        key={idx}
      >
        <Pin
          background={"#616F25"}
          borderColor={"#88993c"}
          glyphColor={"white"}
        />
        {infoWindowShown && (
          <InfoWindow anchor={marker} headerDisabled>
            <div
              onClick={() => {
                setInfoWindowShown(false);
                router.push(`/mensa/${mensa.id}`);
              }}
              className="window-popup"
            >
              <IonCardTitle color={"tertiary"}>{mensa.name}</IonCardTitle>
              <IonCardSubtitle color={mensa.open ? "success" : "warning"}>
                {mensa.open ? "Open" : "Closed"}
              </IonCardSubtitle>
            </div>
          </InfoWindow>
        )}
      </AdvancedMarker>
    );
  };
  return (
    <IonPage>
      <Header pageTitle="Map" />
      <IonContent fullscreen>
        <APIProvider apiKey={API_KEY}>
          <GoogleMap
            defaultCenter={{ lat: DEFAULT_LAT, lng: DEFAULT_LONG }}
            defaultZoom={16}
            mapId={"5a2a13c55010d867"}

          >
            {mensas.map((mensa, idx) => renderMensaMarker(mensa, idx))}
          </GoogleMap>
        </APIProvider>
      </IonContent>
    </IonPage>
  );
};

export default Map;
