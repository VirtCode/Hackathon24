import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonLabel,
  IonText,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Scrollbar, Navigation, Pagination, A11y } from "swiper/modules";
import "./Home.css";
import { Group, Mensa } from "../api/group";
import Header from "../components/Header";
import MensaCard from "../components/MensaCard";
import HostAction from "../components/HostAction";
import HostModal from "../components/HostModal";

interface HomeProps {
  mensas: Mensa[];
  groups: Group[];
}

const Home: React.FC<HomeProps> = ({ mensas, groups }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<{}>({});

  const renderMensaCard = (mensa: Mensa, idx: React.Key) => {
    return (
      <SwiperSlide key={idx}>
        <MensaCard mensa={mensa} />
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
          <IonRow>
            <IonText>
              <h2>Wanna meet up?</h2>
            </IonText>
          </IonRow>
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
        </IonGrid>
        <HostAction
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
        <HostModal
          setData={setData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          mensas={mensas}
          groups={groups}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
