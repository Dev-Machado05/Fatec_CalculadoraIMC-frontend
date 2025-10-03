import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import getTheme from "../components/getTheme/getTheme";
import "./Result.css";

type ImcResultType = {
  imc: number;
  class: string;
  idealWeight: number;
};

function Result() {
  const [sex, setSex] = useState<string>(
    () => localStorage.getItem("userSex") || ""
  );
  const [age, setAge] = useState<number>(
    () => parseFloat(localStorage.getItem("userAge") || "0") ?? 0
  );
  const [height, setHeight] = useState<number>(
    () => parseFloat(localStorage.getItem("userHeight") || "0") ?? 0
  );
  const [weight, setWeight] = useState<number>(
    () => parseFloat(localStorage.getItem("userWeight") || "0") ?? 0
  );
  const [imcResult, setImcResult] = useState<ImcResultType | null>(() => {
    const stored = localStorage.getItem("imcResult");
    return stored ? JSON.parse(stored) : null;
  });
  const [data, setData] = useState<string>(
    () => localStorage.getItem("createdAt") || ""
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (imcResult)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Resultado do IMC</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className={`ion-padding ${getTheme()}-background`}
          fullscreen={true}
        >
          <main className="result_main_container">
            <section
              className={`${getTheme()}Result-container result_container`}
            >
              <div className="result_content">
                <h2 className="result_title">Seu IMC é: {imcResult.imc}</h2>
                <div className="result_info">
                  <p className="result_item">
                    Altura: <span>{height}</span>
                  </p>
                  <p className="result_item">
                    Peso: <span>{weight}</span>
                  </p>
                  <p className="result_item">
                    Classificação: <span>{imcResult.class}</span>
                  </p>
                  <p className="result_item">
                    Peso ideal: <span>{imcResult.idealWeight} kg</span>
                  </p>
                  <p className="result_item">
                    Sexo:{" "}
                    <span>{sex === "male" ? "masculino" : "feminino"}</span>
                  </p>
                  <p className="result_item">
                    Idade: <span>{age}</span>
                  </p>
                  {data ? <h6>Data: {formatDate(data)}</h6> : null}
                </div>
              </div>
            </section>
          </main>
        </IonContent>
      </IonPage>
    );
}

export default Result;
