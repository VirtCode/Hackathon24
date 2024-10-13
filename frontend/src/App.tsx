import { useState, useEffect } from "react";
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
import { getAllGroupsOfUser, Group, Mensa, Session } from "./api/group";
import { getAllMensas } from "./api/mensas";
import { getActiveSession } from "./api/sessions";

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
import { getCurrentUser, User } from "./api/user";
import TableSelect from "./pages/Create";

setupIonicReact();

const App: React.FC = () => {
  const [mensas, setMensas] = useState<Mensa[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    email: "",
    joined: "",
  });

  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const groups: Group[] = await getAllGroupsOfUser();
      setGroups(groups);
      const mensas: Mensa[] = await getAllMensas();
      setMensas(mensas);
      let sessions: any[] = [];
      await Promise.all(
        groups.map(async (group) => {
          const session = await getActiveSession(group.id);
          if (session) sessions.push(session);
        })
      );
      setActiveSessions(() => sessions);
      const user = await getCurrentUser();
      if (user) setUser(user);
    };
    fetchData().then(() => {
      console.log("Fetched all data!");
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home
                mensas={mensas}
                groups={groups}
                activeSessions={activeSessions}
                setActiveSessions={setActiveSessions}
                isToastOpen={isToastOpen}
                setIsToastOpen={setIsToastOpen}
              />
            </Route>
            <Route exact path="/map">
              <Map mensas={mensas} />
            </Route>
            <Route path="/groups">
              <Groups groups={groups} setGroups={setGroups} />
            </Route>
            <Route
              path="/settings"
              render={(props) => <Settings user={user} {...props} />}
              exact
            />
            <Route
              path="/group/:id"
              render={(props) => <GroupDetail user={user} {...props} />}
              exact
            />
            <Route
              exact
              path="/mensa/:id"
              render={(props) => <MensaDetail mensas={mensas} {...props} />}
            />
            <Route
              exact
              path="/create/:id"
              render={(props) => (
                <TableSelect
                  groups={groups}
                  {...props}
                  setIsToastOpen={setIsToastOpen}
                  setActiveSessions={setActiveSessions}
                />
              )}
            />
            <Route exact path="/qr/:id">
              <Redirect to="/create/:id" />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" id="tabs">
            <IonTabButton tab="tab1" href="/home">
              <IonIcon aria-hidden="true" icon={home} />
            </IonTabButton>
            <IonTabButton tab="tab2" href="/map">
              <IonIcon aria-hidden="true" icon={map} />
            </IonTabButton>
            <IonTabButton tab="tab3" href="/groups">
              <IonIcon aria-hidden="true" icon={people} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};
export default App;
