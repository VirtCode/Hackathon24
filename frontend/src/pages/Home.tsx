import React, { useState, useRef } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonModal,
  IonButton,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Scrollbar, Navigation, Pagination, A11y } from "swiper/modules";
import "./Home.css";
import Header from "../components/Header";
import MensaCard from "../components/MensaCard";
import HostAction from "../components/HostAction";

type HomeProps = {
  mensas: Mensa[];
};

const Home: React.FC<HomeProps> = ({ mensas }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{}>({});

  const renderMensaCard = (mensa: Mensa) => {
    return (
      <SwiperSlide>
        <MensaCard name={mensa.name} open={mensa.open} image={mensa.image} />
      </SwiperSlide>
    );
  };

  const confirm = () => {
    modal.current?.dismiss(input.current?.value, "confirm");
  };

  const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === "confirm") setData({ message: "Nice" });
  };

  return (
    <IonPage>
      <Header pageTitle="Mensarr" />
      <IonContent fullscreen>
        <IonGrid className="home-grid">
          <IonRow class="ion-align-items-start">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              direction={"horizontal"}
              slidesPerView={1}
              draggable={false}
              scrollbar={{ draggable: false }}
            >
              {mensas.map((mensa) => renderMensaCard(mensa))}
            </Swiper>
          </IonRow>
          <IonRow class="ion-align-items-end">
            <IonCol>
              <HostAction
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={onWillDismiss}
          isOpen={isModalOpen}
        >
          <IonHeader>
            <IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
          </IonHeader>
        </IonModal>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
