# 📱 Calculadora de IMC

> **Aplicativo mobile para cálculo e acompanhamento do Índice de Massa Corporal (IMC)**

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)

## 📋 Sobre o Projeto

A **Calculadora de IMC** é um aplicativo mobile desenvolvido como projeto acadêmico da FATEC, focado em fornecer uma ferramenta simples e eficaz para calcular e acompanhar o Índice de Massa Corporal de usuários de diferentes faixas etárias.

### ✨ Funcionalidades Principais

- 🧮 **Cálculo de IMC para Adultos** - Sistema interno otimizado
- 👶 **Cálculo de IMC Infantil** - Integração com calculadora oficial CDC
- 📊 **Histórico Completo** - Acompanhamento de cálculos anteriores
- 🔄 **Sincronização Automática** - Dados sempre atualizados
- 🌙 **Tema Adaptativo** - Suporte a modo claro/escuro
- 📱 **Design Responsivo** - Interface otimizada para todos os dispositivos
- ❓ **Manual de Ajuda** - Guia completo de utilização

## 🚀 Tecnologias Utilizadas

### Frontend
- **Ionic 7** - Framework híbrido para desenvolvimento mobile
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Linguagem com tipagem estática
- **Capacitor** - Runtime nativo para apps híbridos
- **CSS3** - Estilização avançada com variáveis e animações

### Backend
- **Node.js** - Runtime JavaScript
- **Vercel** - Plataforma de deploy serverless
- **API REST** - Comunicação cliente-servidor

### Ferramentas de Desenvolvimento
- **Vite** - Build tool rápido e moderno
- **ESLint** - Análise estática de código
- **Git** - Controle de versão

## 📱 Funcionalidades Detalhadas

### 🧮 Cálculo de IMC

#### Para Adultos (20+ anos)
- Entrada de dados: sexo, idade, altura e peso
- Cálculo automático do IMC
- Classificação segundo padrões da OMS
- Sugestão de peso ideal
- Salvamento automático no histórico

#### Para Crianças e Adolescentes (2-19 anos)
- Integração com calculadora oficial do CDC
- Percentis adequados para a idade
- Interface em iframe seguro

### 📊 Sistema de Histórico

- **Auto-refresh** a cada 5 minutos
- **Cache inteligente** para performance
- **Sincronização automática** ao retornar ao app
- **Refresh manual** com botão dedicado
- **Detalhes completos** de cada cálculo
- **Navegação intuitiva** para resultados

### 🎨 Interface e UX

- **Cards modernos** com animações suaves
- **Gradientes coloridos** para identificação visual
- **Ícones intuitivos** do Ionicons
- **Feedback visual** para todas as ações
- **Estados de loading** com skeleton screens
- **Tratamento de erros** com mensagens claras

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

```bash
# Node.js (versão 16 ou superior)
node --version

# Ionic CLI
npm install -g @ionic/cli

# Capacitor CLI
npm install -g @capacitor/cli
```

### Configuração do Projeto

```bash
# Clone o repositório
git clone https://github.com/Dev-Machado05/Fatec_Estrutura-de-Dados.git

# Navegue para o diretório
cd Fatec_Estrutura-de-Dados/calc_IMC/frontend

# Instale as dependências
npm install

# Execute o projeto
ionic serve
```

### 📱 Build para Android

```bash
# Build da aplicação web
ionic build --prod

# Adicionar plataforma Android (primeira vez)
ionic capacitor add android

# Sincronizar arquivos
ionic capacitor sync android

# Gerar APK
cd android
./gradlew assembleDebug
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ExploreContainer/     # Componente exemplo
│   └── getTheme/            # Detector de tema do sistema
├── pages/
│   ├── Tab1.tsx            # Seleção de faixa etária
│   ├── Tab2.tsx            # Histórico de cálculos
│   ├── Tab3.tsx            # Manual de ajuda
│   ├── ImcInfo.tsx         # Calculadora para adultos
│   ├── childImc.tsx        # Calculadora infantil
│   ├── Result.tsx          # Página de resultados
│   └── History.tsx         # Histórico com auto-refresh
├── theme/
│   └── variables.css       # Variáveis de tema
└── assets/
    └── images/             # Ícones SVG para temas
```

## 🎯 Classificações do IMC

### Adultos (≥20 anos)

| Classificação | IMC (kg/m²) | Cor |
|---------------|-------------|-----|
| Abaixo do peso | < 18,5 | 🟡 Amarelo |
| Peso Normal | 18,5 - 24,9 | 🟢 Verde |
| Sobrepeso | 25,0 - 29,9 | 🟡 Amarelo |
| Obesidade Grau 1 | 30,0 - 34,9 | 🔴 Vermelho |
| Obesidade Grau 2 | 35,0 - 39,9 | 🔴 Vermelho |
| Obesidade Grau 3 | ≥ 40,0 | 🔴 Vermelho |

## 🔄 Sistema de Versionamento

### Convenção Semântica
- **MAJOR.MINOR.PATCH** (ex: 1.2.1)
- **MAJOR**: Mudanças incompatíveis
- **MINOR**: Novas funcionalidades
- **PATCH**: Correções de bugs

### Histórico de Versões

#### v1.1.0 (Atual)
- ✅ Interface modernizada com tema adaptativo
- ✅ Sistema de auto-refresh no histórico
- ✅ Manual de ajuda integrado
- ✅ Melhorias de performance e UX

#### v1.0.0
- 🚀 Lançamento inicial
- 📱 Cálculo de IMC básico
- 💾 Sistema de histórico
- 🌐 Integração com backend

## 🚀 Deploy e Distribuição

### Desenvolvimento
```bash
ionic serve                    # Servidor local
ionic capacitor run android    # Executar no Android
ionic capacitor run ios        # Executar no iOS
```

### Produção
```bash
ionic build --prod            # Build otimizado
./gradlew assembleRelease     # APK de produção
```

## 🧪 Testes

### Testes Unitários
```bash
npm test                      # Executar testes
npm run test:coverage        # Cobertura de testes
```

### Testes E2E
```bash
npx cypress run              # Testes end-to-end
npx cypress open             # Interface gráfica
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem estática
- Siga as convenções do ESLint
- Mantenha componentes pequenos e reutilizáveis
- Documente funções complexas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: [Dev-Machado05](https://github.com/Dev-Machado05)
- **Instituição**: FATEC - Faculdade de Tecnologia
- **Disciplina**: Estrutura de Dados

## 📞 Contato

- 📧 Email: [email@exemplo.com]
- 🐙 GitHub: [@Dev-Machado05](https://github.com/Dev-Machado05)
- 🎓 FATEC: [Site Institucional](https://fatec.sp.gov.br/)

---

<div align="center">

**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

Desenvolvido com ❤️ por estudantes da FATEC

</div>