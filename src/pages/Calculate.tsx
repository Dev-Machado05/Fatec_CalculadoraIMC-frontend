import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Calculate.css";
import getTheme from "../components/getTheme/getTheme";
import { useHistory } from "react-router-dom";

const Calculate: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calcular Imc</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className={`ion-padding ${getTheme()}-background`}
        fullscreen={true}
      >
        <main className="ageGroup_container">
          <section className="ageGroup_content">
            <p>qual a faixa etária pessoa?</p>
            <div className="ageGroupButton_container">
              <IonButton
                onClick={() => {
                  history.push("/childImc");
                }}
                >
                Criança (2 a 19anos)
              </IonButton>
              <IonButton
                onClick={() => {
                  history.push("/ImcInfo");
                }}
              >
                adulto (apartir dos 20anos)
              </IonButton>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Calculate;
