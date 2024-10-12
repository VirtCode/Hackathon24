import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, map, people } from "ionicons/icons";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Groups from "./pages/Groups";
import Settings from "./pages/Settings";
import GroupDetail from "./pages/GroupDetail";
import MensaDetail from "./pages/MensaDetail";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const mensas: Mensa[] = [
  {
    id: 1,
    name: "Polymensa",
    position: { lat: 47.376661270004625, lng: 8.546335386948527 },
    image: "polymensa.jpg",
    open: true,
  },
  {
    id: 2,
    name: "Archimedes",
    position: { lat: 47.377333693765095, lng: 8.55339563884709 },
    image: "archimedes.jpg",
    open: false,
  },
  {
    id: 3,
    name: "UZH Zentrum",
    position: { lat: 47.373986372527774, lng: 8.548303462614687 },
    image: "uzh-zentrum.jpeg",
    open: true,
  },
  {
    id: 4,
    name: "Clausiusbar",
    position: { lat: 47.37720447727566, lng: 8.5470529791761 },
    image: "clausiusbar.jpg",
    open: false,
  },
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home mensas={mensas} />
          </Route>
          <Route exact path="/map">
            <Map mensas={mensas} />
          </Route>
          <Route path="/groups">
            <Groups />
          </Route>
          <Route path="/settings" component={Settings} exact />
          <Route path="/group/:id" component={GroupDetail} exact />
          <Route
            exact
            path="/mensa/:id"
            render={(props) => <MensaDetail mensas={mensas} {...props} />}
          />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/map">
            <IonIcon aria-hidden="true" icon={map} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/groups">
            <IonIcon aria-hidden="true" icon={people} />
            <IonLabel>Groups</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
