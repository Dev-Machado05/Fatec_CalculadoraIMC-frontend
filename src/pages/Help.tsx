import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { 
  calculatorOutline, 
  timeOutline, 
  informationCircleOutline,
  warningOutline,
  checkmarkCircleOutline,
  helpCircleOutline
} from 'ionicons/icons';
import './Help.css';
import getTheme from '../components/getTheme/getTheme';
import { useHistory } from 'react-router-dom';

const Help: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Manual de Ajuda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${getTheme()}-background`} fullscreen>
        <main className="help-container">
          {/* Introdução */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={helpCircleOutline} />
                Bem-vindo ao Calculadora de IMC
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Este aplicativo foi desenvolvido para ajudar você a calcular e acompanhar 
                seu Índice de Massa Corporal (IMC) de forma fácil e prática. O IMC é uma 
                medida importante para avaliar se seu peso está adequado para sua altura.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Como usar o app */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={calculatorOutline} />
                Como Usar o Aplicativo
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>1. Acesse a aba "Calcular IMC"</h3>
                    <p>Na primeira aba, escolha a faixa etária da pessoa para quem você deseja calcular o IMC.</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>2. Escolha a Faixa Etária</h3>
                    <p><strong>Criança (2 a 19 anos):</strong> Usa uma calculadora especializada do CDC</p>
                    <p><strong>Adulto (a partir de 20 anos):</strong> Usa nosso sistema de cálculo interno</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>3. Preencha os Dados</h3>
                    <p>Para adultos, informe: sexo, idade, altura (em metros) e peso (em kg)</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>4. Veja o Resultado</h3>
                    <p>O sistema calculará seu IMC e mostrará a classificação correspondente</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Histórico */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={timeOutline} />
                Histórico de Cálculos
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Na aba "Histórico", você pode visualizar todos os cálculos de IMC realizados 
                anteriormente. Cada registro inclui:
              </p>
              <IonList>
                <IonItem>
                  <IonLabel>• Data e hora do cálculo</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>• Dados pessoais utilizados</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>• Resultado do IMC</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>• Classificação obtida</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>• Peso ideal calculado</IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Classificações do IMC */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={informationCircleOutline} />
                Classificações do IMC
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>Abaixo do peso</h3>
                    <p>IMC menor que 18,5</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Peso Normal</h3>
                    <p>IMC entre 18,5 e 24,9</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Sobrepeso</h3>
                    <p>IMC entre 25,0 e 29,9</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Obesidade Grau 1</h3>
                    <p>IMC entre 30,0 e 34,9</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Obesidade Grau 2</h3>
                    <p>IMC entre 35,0 e 39,9</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Obesidade Grau 3</h3>
                    <p>IMC igual ou maior que 40,0</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Dicas importantes */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={warningOutline} />
                Dicas Importantes
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>Medidas Precisas</h3>
                    <p>Use uma balança calibrada e meça a altura sem sapatos para resultados mais precisos</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Unidades de Medida</h3>
                    <p>Altura deve ser informada em metros (ex: 1.70) e peso em quilogramas (ex: 70)</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Limitações do IMC</h3>
                    <p>O IMC não considera massa muscular, estrutura óssea ou distribuição de gordura</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Consulte um Médico</h3>
                    <p>Para orientações personalizadas sobre peso e saúde, sempre consulte um profissional</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Recursos especiais */}
          <IonCard className="help-card">
            <IonCardHeader>
              <IonCardTitle className="help-title">
                <IonIcon icon={checkmarkCircleOutline} />
                Recursos Especiais
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h3>Tema Automático</h3>
                    <p>O aplicativo se adapta automaticamente ao tema claro/escuro do seu dispositivo</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Calculadora Infantil</h3>
                    <p>Para crianças e adolescentes, usamos a calculadora oficial do CDC (Centers for Disease Control)</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Peso Ideal</h3>
                    <p>O sistema calcula automaticamente o peso ideal baseado na sua altura e sexo</p>
                  </IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h3>Histórico Online</h3>
                    <p>Seus cálculos são salvos online e podem ser acessados de qualquer dispositivo</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Botão para começar */}
          <div className="help-actions">
            <IonButton 
              expand="block" 
              color="primary"
              onClick={() => history.push('/tab1')}
            >
              <IonIcon icon={calculatorOutline} slot="start" />
              Começar a Calcular IMC
            </IonButton>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Help;
