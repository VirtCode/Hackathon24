import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
import Header from "../components/Header";
import MensaCard from "../components/MensaCard";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <Swiper slidesPerView={3} direction={"horizontal"}>
          <SwiperSlide>
            <MensaCard
              name="Polymensa"
              open={true}
              image={"public/polymensa.jpg"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <MensaCard
              name="Archimedes"
              open={false}
              image={"public/archimedes.jpg"}
            />
          </SwiperSlide>
        </Swiper>
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
