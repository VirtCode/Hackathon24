import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react";
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
import HostModal from "../components/HostModal";

type HomeProps = {
  mensas: Mensa[];
};

const Home: React.FC<HomeProps> = ({ mensas }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{}>({});

  const renderMensaCard = (mensa: Mensa, idx: React.Key) => {
    return (
      <SwiperSlide key={idx}>
        <MensaCard name={mensa.name} open={mensa.open} image={mensa.image} />
      </SwiperSlide>
    );
  };

  return (
    <IonPage>
      <Header pageTitle="Mensarr" />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="home-grid">
          <IonRow class="ion-align-items-start">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              direction={"horizontal"}
              slidesPerView={1}
              draggable={false}
              scrollbar={{ draggable: false }}
            >
              {mensas.map((mensa, idx) => renderMensaCard(mensa, idx))}
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
        <HostModal
          setData={setData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          mensas={mensas}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
