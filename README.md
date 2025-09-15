# TechMatch Versão 2 - README

[![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/FatecLP/diagnostico)]() &nbsp;&nbsp;&nbsp;
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css&logoColor=white)]()
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat&logo=Sass&logoColor=white)]()
[![JavaScript](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=&logo=Node.js&logoColor=white)]()
[![Express.js](https://img.shields.io/badge/Express.js-fff?logo=express&logoColor=000&style=flat)]()
[![Gemini](https://img.shields.io/badge/Google%20Gemini%20API-8E75B2?style=&logo=google%20gemini&flat&logoColor=white)]()

Techmatch é um projeto de dinamica ágil desenvolvido na **Fatec Luigi Papaiz** com a finalidade de ser um quiz para quem deseja saber qual área tech mais se enquadra para especialização, com a **versão 2** mesclada das branchs "techmatchAPI" e "slot-machine" adicionamos integração do projeto com a API **Gemini AI**, ampliando as funcionalidades de inteligência artificial e permitindo maior capacidade de análise e geração de conteúdo em tempo real.

O processo de desenvolvimento foi conduzido em **dinâmica de laboratório**, utilizando **aprendizado ágil** dentro de uma **metodologia imersiva** prática, o que proporcionou experimentação contínua, validação rápida e colaboração efetiva entre os participantes.

## 👥 Nomes dos Integrantes
- André Diogo Melchior da Silva
- Juan Pablo Firmino Ferreira
- Michael Akira de Lima Kuwahara
- Murilo de Oliveira Sartori
- Nickolas Lopes Araújo

## 👨🏻‍🏫 Professor
- **PhD - [Bruno Zolotareff dos Santos](https://github.com/bzsantos)** (Desenvolvimento Web II: FATEC Diadema - Luigi Papaiz)

## 📚 Apredizado

A nova versão do projeto trouxe duas frentes principais: integração com a API Gemini AI e a implementação de um caça-níquel interativo que faz uso das respostas para gerar resultados dinâmicos.

- 🤖 **Integração com a API Gemini AI**
  - **Fetch** para comunicação com a **API** via requisições HTTP
  - **Template strings** para criação de prompts
  - Manipulação de **JSON** para captura de respostas
  - Uso de funções assincronas com **async** e **await** para lidar com chamadas assíncronas
      - async define a função como assíncrona, permitindo await
      - await pausa/espera a execução até que a resposta seja retornada
      
- 🌐 **Rotas com Node.js**
  - **npm** (Node Package Manager) utilizado para gerenciar dependências e scripts do projeto
  - Uso do microframework **Express.js** que simplifica a criação de rotas e a estrutura do servidor
  - **Path** para trabalhar com caminhos de arquivos e diretórios
 
- 🛡️ **Tratamento de erros**
  - Uso de **try...catch** para capturar exceções em requisições assíncronas.
    - **try** disponibiliza um bloco de código que "tenta" exeutar instruções que podem ter algum problema externo/exceção
    - **catch** pega o erro gerado caso seja gerada uma exceção ao executar um código no try, pode ser lançado ou tratado.
   
- 🎰 **Caça-níquel interativo**
  - Implementada em **JavaScript**, roda resultados aleatórios e por fim mostra o resultado final
  - Eventos **DOM** para animação e exibição dinâmica do resultado
  - **Keyframes CSS** para animação do Caça-niquel

## 🚀 Como Executar

1. **Clone o repositório**
```bash
git clone https://github.com/FatecLP/Site-Naruto.git
```

2. **Abra o projeto**
```bash
code techmatch
```
ou abra a pasta em qualquer outro editor de código

3. **Instale as dependencias do Node via CLI**
```bash
npm install 
```
certifique-se de que está dentro da pasta do projeto no terminal

4. **Exeute o projeto**
```bash
node app.js
```

5. **Acesse o link local gerado pelo node** (ex.: https://localhost:3333/)


### **TechMatch** é uma plataforma objetiva e simples que oferece um quiz interativo para ajudar as pessoas a escolherem o caminho mais adaptado com sua personalidade no mundo do desenvolvimento. Fique a vontade para contribuir abrindo issues ou PRs.
