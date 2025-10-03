import "./ImcInfo.css";
import getTheme from "../components/getTheme/getTheme";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonAlert,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

const ImcInfo: React.FC = () => {
  const history = useHistory();
  const [sex, setSex] = useState<string>(
    () => localStorage.getItem("userSex") ?? ""
  );
  const [age, setAge] = useState<number>(
    () => parseInt(localStorage.getItem("userAge") || "0") ?? 0
  );
  const [height, setHeight] = useState<number>(
    () => parseFloat(localStorage.getItem("userHeight") || "0") ?? 0
  );
  const [weight, setWeight] = useState<number>(
    () => parseFloat(localStorage.getItem("userWeight") || "0") ?? 0
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ImcData, setImcData] = useState<{
    sex: string;
    age: number;
    height: number;
    weight: number;
  } | null>(null);

  useEffect(() => {
    setImcData({
      sex: sex,
      age: age,
      height: height,
      weight: weight,
    });
  }, [sex, age, height, weight]);

  useEffect(() => {
    if (age && age < 0) {
      setAge(0);
    }
    if (weight && weight < 0) {
      setWeight(0);
    }
    if (height && height < 0) {
      setHeight(0);
    }
  }, [age, weight, height]);

  useEffect(() => {
    localStorage.setItem("userSex", sex);
  }, [sex]);
  useEffect(() => {
    localStorage.setItem("userAge", age.toString());
  }, [age]);
  useEffect(() => {
    localStorage.setItem("userHeight", height.toString());
  }, [height]);
  useEffect(() => {
    localStorage.setItem("userWeight", weight.toString());
  }, [weight]);

  // fazer o POST e trata a resposta
  async function postImc() {
    try {
      const resp = await fetch("https://fatec-calculadora-imc-backend.vercel.app/api/handleImc.js", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ImcData),
      });

      // valida/trata a resposta

      if (resp.status == 200) {
        const data = await resp.json();

        localStorage.setItem("imcResult", JSON.stringify(data));

        return { success: true, data };
      } else {
        const errorText = await resp.text();
        console.error("Erro da API:", errorText);

        return { success: false, error: errorText };
      }
    } catch (err) {
      console.error("Erro de conexão:", err);

      return { success: false, error: "Erro de conexão com o servidor" };
    }
  }

  async function calculateIMC() {
    if (weight && height && age && sex && age > 19) {
      const result = await postImc();

      if (result.success) {
        history.push(`/result`);
        console.log(result.data);
      } else {
        setErrorMessage(result.error || "Erro ao calcular IMC");
        setIsOpen(true);
      }
    } else if (age !== 0 && age <= 19) {
      setErrorMessage(
        "Para calcular o Imc de pessoas entre 2 a 19anos utilize a calculadora infantil"
      );
      setIsOpen(true);
    } else {
      setErrorMessage("Preencha todos os campos antes de prosseguir...");
      setIsOpen(true);
    }
  }

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
        <main className="calculateImc_container">
          <form className={`${getTheme()}Form-container form_container`}>
            <section className={`${getTheme()}Input-container input_container`}>
              <div className="input_content">
                <span>Sexo:</span>
                <IonSelect
                  value={sex}
                  placeholder="Escolha: "
                  onIonChange={(e) => {
                    setSex(e.detail.value);
                  }}
                >
                  <IonSelectOption value="male">Masculino</IonSelectOption>
                  <IonSelectOption value="female">Feminino</IonSelectOption>
                </IonSelect>
              </div>
              <div className="input_content">
                <span>idade:</span>
                <IonInput
                  placeholder="apartir dos 20 anos"
                  className={`${getTheme}-input`}
                  type="number"
                  value={age !== 0 ? age : null}
                  onIonChange={(e) => {
                    e.target.value
                      ? setAge(parseInt(e.target.value.toString()))
                      : null;
                  }}
                />
              </div>
              <div className="input_content">
                <span>peso (kg):</span>
                <IonInput
                  placeholder="Ex: 70"
                  className={`${getTheme}-input`}
                  type="number"
                  value={weight !== 0 ? weight : null}
                  onIonChange={(e) => {
                    e.target.value
                      ? setWeight(parseInt(e.target.value.toString()))
                      : null;
                  }}
                />
              </div>
              <div className="input_content">
                <span>Altura (m):</span>
                <IonInput
                  placeholder="Ex: 1.75"
                  className={`${getTheme}-input`}
                  type="number"
                  value={height !== 0 ? height : null}
                  step="0.01"
                  onIonChange={(e) => {
                    e.target.value
                      ? setHeight(parseFloat(e.target.value.toString()))
                      : null;
                  }}
                />
              </div>
            </section>
            <IonButton
              onClick={() => {
                localStorage.setItem("createdAt", '');
                calculateIMC();
              }}
            >
              calcular
            </IonButton>
          </form>
        </main>
      </IonContent>
      <IonAlert
        isOpen={isOpen}
        header="Atenção!!"
        message={errorMessage}
        buttons={["OK"]}
        onDidDismiss={() => {
          setIsOpen(false);
        }}
      ></IonAlert>
    </IonPage>
  );
};

export default ImcInfo;
