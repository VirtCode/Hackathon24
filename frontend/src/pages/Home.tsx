import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonLabel,
  IonText,
  IonList,
  IonToast,
  IonItem,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Scrollbar, Navigation, Pagination, A11y } from "swiper/modules";
import "./Home.css";
import { Group, Mensa, Session } from "../api/group";
import Header from "../components/Header";
import MensaCard from "../components/MensaCard";
import HostAction from "../components/HostAction";
import ScannerModal from "../components/ScannerModal";

interface HomeProps {
  mensas: Mensa[];
  groups: Group[];
  activeSessions: Session[];
  setActiveSessions: Dispatch<SetStateAction<any[]>>;
  isToastOpen: boolean;
  setIsToastOpen: Dispatch<SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({
  mensas,
  groups,
  activeSessions,
  setActiveSessions,
  isToastOpen,
  setIsToastOpen,
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const renderSession = (session: Session, idx: number) => {
    return (
      <IonItem
        key={idx}
        routerLink={`/group/${session.group?.id}`}
        color="success"
        className="pending-session"
      >
        {session.pending ? "Pending" : "Active"} - {session.group?.name}
      </IonItem>
    );
  };

  useEffect(() => {}, [activeSessions]);

  const renderMensaCard = (mensa: Mensa, idx: React.Key) => {
    return (
      <SwiperSlide key={idx} id="slide-container">
        <MensaCard mensa={mensa} />
      </SwiperSlide>
    );
  };

  return (
    <IonPage>
      <Header pageTitle="Mensarr" />
      <IonContent fullscreen>
        <IonGrid className="home-grid">
          {activeSessions.length > 0 && (
            <IonList>
              {activeSessions.map((session, idx) =>
                renderSession(session, idx)
              )}
            </IonList>
          )}
          <IonRow>
            <IonText>
              <h2>Already Hungry?</h2>
            </IonText>
          </IonRow>
          <IonRow class="ion-align-items-start">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              direction={"horizontal"}
              slidesPerView={window.screen.width > 900 ? 3 : 1}
              draggable={false}
              scrollbar={{ draggable: false }}
            >
              {mensas.map((mensa, idx) => renderMensaCard(mensa, idx))}
            </Swiper>
          </IonRow>
        </IonGrid>
        <HostAction
          openScan={() => {
            setIsScannerOpen(true);
          }}
        />
        <ScannerModal
          setIsScannerOpen={setIsScannerOpen}
          isScannerOpen={isScannerOpen}
        />
        <IonToast
          isOpen={isToastOpen}
          duration={3000}
          message={"Created Session!"}
          position="bottom"
          positionAnchor="tabs"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
