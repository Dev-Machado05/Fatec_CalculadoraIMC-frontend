import { useState } from "react";
import "./childImc.css";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonAlert,
} from "@ionic/react";

function ChildImc() {
  const [alert, setAlert] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>IMC Infantil (2 a 19 anos)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <main className="childImc_container">
          <iframe
            src="https://www.cdc.gov/bmi/child-teen-calculator/calculator.html"
            title="Calculadora de IMC para Crianças e Adolescentes"
            width="auto"
            height="680"
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
            style={{ border: "none", minHeight: "600px" }}
            aria-label="Calculadora de IMC infantil do CDC"
          />
        </main>
      </IonContent>
      <IonAlert
        isOpen={!alert}
        header="Atenção!!"
        message="Como o calculo do Imc Infantil é feito por meio de um componente externo, nós NÃO salvamos estes calculos no nosso histórico, já que nós não temos acesso ao que será implementado..."
        buttons={["ok"]}
      ></IonAlert>
    </IonPage>
  );
}

export default ChildImc;
