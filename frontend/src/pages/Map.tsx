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
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const openInfo = () => {
      setInfoWindowShown(true);
    };
    const closeInfo = () => {
      setInfoWindowShown(false);
    };
    return (
      <IonItem routerLink={`/mensa/${mensa.id}`} key={idx}>
        <AdvancedMarker
          position={{
            lat: mensa.lat,
            lng: mensa.lng,
          }}
          title={mensa.name}
          onClick={openInfo}
          ref={markerRef}
          onMouseEnter={openInfo}
          onMouseLeave={closeInfo}
        >
          <Pin
            background={"#616F25"}
            borderColor={"#88993c"}
            glyphColor={"white"}
          />
          {infoWindowShown && (
            <InfoWindow anchor={marker} headerDisabled={true}>
              <IonCardTitle>{mensa.name}</IonCardTitle>
              <IonCardSubtitle color={mensa.open ? "success" : "warning"}>
                {mensa.open ? "Open" : "Closed"}
              </IonCardSubtitle>
            </InfoWindow>
          )}
        </AdvancedMarker>
      </IonItem>
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
