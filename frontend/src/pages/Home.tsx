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
import { Scrollbar } from "swiper/modules";
import "./Home.css";
import Header from "../components/Header";
import MensaCard from "../components/MensaCard";
import Share from "../components/Share";

type HomeProps = {
  mensas: Mensa[];
};

const Home: React.FC<HomeProps> = ({ mensas }) => {
  const renderMensaCard = (mensa: Mensa) => {
    return (
      <SwiperSlide>
        <MensaCard name={mensa.name} open={mensa.open} image={mensa.image} />
      </SwiperSlide>
    );
  };
  return (
    <IonPage>
      <Header pageTitle="Mensarr" />
      <IonContent fullscreen>
        <IonGrid className="home-grid">
          <IonRow class="ion-align-items-start">
            <Swiper
              modules={[Scrollbar]}
              direction={"horizontal"}
              slidesPerView={1}
            >
              {mensas.map((mensa) => renderMensaCard(mensa))}
            </Swiper>
          </IonRow>
          <IonRow class="ion-align-items-end">
            <IonCol>
              <Share />
            </IonCol>
          </IonRow>
        </IonGrid>
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
