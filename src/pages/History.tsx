import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSkeletonText,
  IonIcon,
  IonButton,
  IonBadge
} from "@ionic/react";
import { 
  timeOutline, 
  personOutline, 
  resizeOutline, 
  scaleOutline,
  fitnessOutline,
  calendarOutline,
  chevronForwardOutline,
  refreshOutline
} from 'ionicons/icons';
import "./History.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getTheme from "../components/getTheme/getTheme";

type setupRedirection_type = {
  imc: number,
  classification: "Abaixo do peso" | "Peso Normal" | "Sobrepeso" | "Obesidade grau 1" | "Obesidade grau 2" | "Obesidade grau 3",
  age: number,
  sex: number,
  height: number,
  weight: number,
  idealWeight: number,
  data: any
}

const History: React.FC = () => {
  const history = useHistory();
  const [historyData, setHistoryData] = useState<any[]>();
  const [error, setError] = useState<string|null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Configurações de reload
  const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutos
  const CACHE_DURATION = 2 * 60 * 1000; // 2 minutos

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Abaixo do peso":
        return "warning";
      case "Peso Normal":
        return "success";
      case "Sobrepeso":
        return "warning";
      case "Obesidade grau 1":
      case "Obesidade grau 2":
      case "Obesidade grau 3":
        return "danger";
      default:
        return "medium";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const setupRedirection = ({imc, classification, age, sex, height, weight, idealWeight, data}: setupRedirection_type) => {
    try {
      localStorage.setItem("userSex", JSON.stringify(sex));
      localStorage.setItem("userAge", JSON.stringify(age));
      localStorage.setItem("userHeight", JSON.stringify(height));
      localStorage.setItem("userWeight", JSON.stringify(weight));
      localStorage.setItem("imcResult", JSON.stringify({imc: imc, class: classification, idealWeight: idealWeight}));
      localStorage.setItem("createdAt", data);
    } catch (err) {
      setError(JSON.stringify(err));
      setErrorMessage('Ocorreu um erro ao tentar salvar os dados, tente novamente mais tarde');
      setIsOpen(true);
      console.error(err);
    }
  }

  const fetchHistory = async () => {
    try {
      const resp = await fetch('https://fatec-calculadora-imc-backend.vercel.app/api/history.js', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (resp.ok) {
        const data = await resp.json();

        if (data.success) {
          setHistoryData(data.data);
          console.table(data.data);
        } else {
          setError('Erro ao carregar histórico');
          setErrorMessage('Ocorreu um erro ao carregar histórico, tente novamente mais tarde. caso o erro persistir entre em contato conosco')
          setIsOpen(true);
        }
      } else {
        setError(`Erro HTTP: ${resp.status}`);
        setErrorMessage(`Erro HTTP: ${resp.status}. caso o erro persistir entre em contato conosco`)
        setIsOpen(true);
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      setErrorMessage('Erro de conexão com o servidor, tente novamente mais tarde. caso o erro persistir entre em contato conosco')
      setIsOpen(true);
      console.error('fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  // Função wrapper para controle de cache e refresh manual
  const handleFetchWithCache = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Se não é force refresh e tem cache válido, não faz nada
    if (!forceRefresh && lastFetch && (now - lastFetch) < CACHE_DURATION && historyData) {
      console.log('Dados em cache ainda válidos');
      return;
    }

    // Atualizar timestamp antes do fetch
    setLastFetch(now);
    
    // Chamar a função original
    await fetchHistory();
  };

  // Função para refresh manual
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchHistory();
      setLastFetch(Date.now());
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Fetch inicial
    fetchHistory();
    setLastFetch(Date.now());
  }, []);

  // Auto-refresh a cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Auto-refresh executado');
      handleFetchWithCache(true);
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Reload quando o app volta a ficar visível
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('App voltou a ficar visível');
        const now = Date.now();
        if (lastFetch && (now - lastFetch) > CACHE_DURATION) {
          handleFetchWithCache(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [lastFetch]);

  // Reload quando a janela ganha foco
  useEffect(() => {
    const handleFocus = () => {
      console.log('Janela ganhou foco');
      const now = Date.now();
      if (lastFetch && (now - lastFetch) > CACHE_DURATION) {
        handleFetchWithCache(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [lastFetch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Histórico de Cálculos
            {refreshing && <span style={{ fontSize: '0.7em', marginLeft: '8px' }}>🔄</span>}
          </IonTitle>
          <IonButton 
            fill="clear" 
            slot="end" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <IonIcon icon={refreshOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${getTheme()}-background`} fullscreen>
        <main className="history-container">
          {loading ? (
            <div className="loading-container">
              <IonCard className="loading-card">
                <h2 className={`${getTheme}Login-text`}>Carregando o conteudo da pagina...</h2>
              </IonCard>
            </div>
          ) : error ? (
            <IonCard className="error-card">
              <IonCardHeader>
                <IonCardTitle className="error-title">
                  <IonIcon icon={refreshOutline} />
                  Erro ao Carregar Histórico
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p className="error-message">{error}</p>
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  onClick={handleRefresh}
                  className="retry-button"
                >
                  <IonIcon icon={refreshOutline} slot="start" />
                  Tentar Novamente
                </IonButton>
              </IonCardContent>
            </IonCard>
          ) : historyData && historyData.length > 0 ? (
            <div className="history-content">
              <IonCard className="header-card">
                <IonCardHeader>
                  <IonCardTitle className="history-title">
                    <IonIcon icon={timeOutline} />
                    Histórico de IMCs
                    <IonBadge color="primary">{historyData.length}</IonBadge>
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Clique em qualquer registro para ver os detalhes completos</p>
                  {lastFetch > 0 && (
                    <p style={{ fontSize: '0.8em', color: 'var(--ion-color-medium)', marginTop: '8px' }}>
                      Última atualização: {new Date(lastFetch).toLocaleTimeString('pt-BR')}
                    </p>
                  )}
                  {refreshing && (
                    <p style={{ fontSize: '0.8em', color: 'var(--ion-color-primary)', marginTop: '4px' }}>
                      🔄 Atualizando dados...
                    </p>
                  )}
                </IonCardContent>
              </IonCard>

              <div className="records-grid">
                {historyData.map((record: any, index: number) => (
                  <IonCard 
                    key={record.id || index} 
                    className="history-record-card"
                    button
                    onClick={() => {
                      setupRedirection({
                        imc: record.imc_result,
                        classification: record.imc_class,
                        age: record.user_age,
                        sex: record.user_sex,
                        height: record.user_height,
                        weight: record.user_weight,
                        idealWeight: record.ideal_weight,
                        data: record.created_at
                      });
                      history.push('/result');
                    }}
                  >
                    <IonCardHeader>
                      <IonCardTitle className="record-title">
                        <div className="imc-info">
                          <span className="imc-value">IMC: {record.imc_result}</span>
                          <IonBadge color={getClassificationColor(record.imc_class)}>
                            {record.imc_class}
                          </IonBadge>
                        </div>
                        <IonIcon icon={chevronForwardOutline} className="chevron-icon" />
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <section className="record-details">
                        <section className="detail-item">
                          <IonIcon icon={personOutline} />
                          <div className="detail-content">
                            <h3>Dados Pessoais</h3>
                            <p>{record.user_sex}, {record.user_age} anos</p>
                          </div>
                        </section>

                        <section className="detail-item">
                          <IonIcon icon={resizeOutline} />
                          <div className="detail-content">
                            <h3>Medidas</h3>
                            <p>{record.user_height}m × {record.user_weight}kg</p>
                          </div>
                        </section>

                        {record.imc_class !== 'Peso Normal' && (
                          <section className="detail-item">
                            <IonIcon icon={fitnessOutline} />
                            <div className="detail-content">
                              <h3>Peso Ideal</h3>
                              <p>{record.ideal_weight}kg</p>
                            </div>
                          </section>
                        )}

                        <section className="detail-item">
                          <IonIcon icon={calendarOutline} />
                          <div className="detail-content">
                            <h3>Data do Cálculo</h3>
                            <p>{formatDate(record.created_at)}</p>
                          </div>
                        </section>
                      </section>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          ) : (
            <IonCard className="empty-state-card">
              <IonCardHeader>
                <IonCardTitle className="empty-title">
                  <IonIcon icon={scaleOutline} />
                  Nenhum Cálculo Realizado
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Você ainda não fez nenhum cálculo de IMC.</p>
                <IonButton 
                  expand="block" 
                  routerLink="/tab1"
                  className="calculate-button"
                >
                  <IonIcon icon={scaleOutline} slot="start" />
                  Calcular Meu Primeiro IMC
                </IonButton>
              </IonCardContent>
            </IonCard>
          )}
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
      />
    </IonPage>
  );
};

export default History;
