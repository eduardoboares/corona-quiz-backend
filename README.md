<h6 align="center"><img width="280" height="220" src="coronaquiz.png"></h6>

<h1 align="center">BACK-END - Corona Quiz</h1>

<h4 align="center">📚 Análise e Desenvolvimento de Sistemas 📚</h4>
<h4 align="center">🏨 Faculdade de Tecnologia de São José dos Campos - Prof. Jessen Vidal. 🏨</h4>

<!-- E02041 -->
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/EduardoPereiraBoares/corona-quiz-backend?color=%23E02041">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/EduardoPereiraBoares/corona-quiz-backend?color=%23E02041">
  
  <a href="https://github.com/Group2IntegrationProject/back-end/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/EduardoPereiraBoares/corona-quiz-backend?color=%23E02041">
  </a>
  
  <a href="https://github.com/Group2IntegrationProject/back-end/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/EduardoPereiraBoares/corona-quiz-backend?color=%23E02041">
  </a>
  
   <img alt="GitHub" src="https://img.shields.io/github/license/EduardoPereiraBoares/corona-quiz-backend?color=%23E02041">
</p>

<h5 align="center">
  <a href="#-introdução">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-arquitetura-da-api">Arquitetura da API</a>
</h5><br>

<div align="center">
 <a href="https://insomnia.rest/run/?label=Corona%20Quiz%20Back-end&uri=https%3A%2F%2Fcorona-quiz-backend%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Execute no Insomnia"></a>
</div><br>

# 📖 INTRODUÇÃO<br>

 Este repositório é do back-end do trabalho semestral da matéria de Programação em Microinformatica do 1º semestre de Análise e Desenvolvimento de Sistemas da Faculdade de Tecnologia de São José dos Campos - Prof. Jessen Vidal, cuja a mesma é palestrada pelo Prof. Jean Carlos Lourenço Costa. Este projeto teve como finalidade desenvolver uma aplicação mobile no modelo de Quiz e o tema escolhido por mim foi sobre o coronavírus, devido a situação atual em que o planeta vive de pandemia de Covid-19, portando, decidi fazer esse aplicativo com característica mais informativa unindo o aprendizado descontraído de um Quiz. <br>
 Este back-end trata-se de uma API-REST feita em NodeJS com a utilização do Express e o MongoDB, contendo um módulo de autenticação e criação de Quiz e possuindo um controle de rotas/endpoints com um middleware responsável pela verificação de token. <br>
 Para disponibilizar de modo mais prático e fácil esta API, foi realizado o deploy no Heroku. Para acessá-la e consumi-la clique no botão do Insomnia logo acima e baixe o arquivo json.<br><br>
 

# 🌐 TECNOLOGIAS<br>

Nesta aplicação foram selecionadas certas tecnologias, onde apresentaram maiores diretrizes para que fosse cumprido o objetivo do trabalho. As quais serão descritas a seguir:                                                                                                                                                             
<h3>✳️ NodeJS </h3>
O Node.js é um ambiente de tempo de execução JavaScript de código aberto e de plataforma cruzada. O Node.js executa o mecanismo JavaScript V8, o núcleo do Google Chrome, fora do navegador. Isso permite que o Node.js seja muito eficiente. Ele pode ser usado tanto para Front-End como para Back-End, o que facilita, pois evita ter de aprender uma nova linguagem.

<h3>🗄️ Heroku </h3>

O Heroku é uma plataforma em nuvem que permite que as empresas construam, entreguem, monitorem e escalem aplicativos. Basicamente um servidor na nuvem, onde empresas e desenvolvedores podem conectar suas aplicações.
 
<h3>🍃 MongoDB</h3>

O MongoDB é um banco de dados distribuído, embasado em documentos e de propósito geral, desenvolvido para desenvolvedores de aplicativos modernos e para ser utilizado em nuvem. O MongoDB permite a criação de usuários, configurando seus privilégios de acesso, baseado em usuário administrador, usuários com permissões de leitura e gravação de dados e usuários que podem apenas ler os mesmos.

<h3>🔳 GitHub</h3>

Github é um serviço web que oferece diversas funcionalidades extras aplicadas ao git. Quase todos os projetos/frameworks/bibliotecas sobre desenvolvimento open source estão no github, e o usuário pode acompanhá-los através de novas versões, contribuir informando bugs ou até mesmo enviando código e correções. <br><br>

# 🧩 ARQUITETURA DA API<br>

Esta etapa irá detalhar todo o funcionamento solene do desenvolvimento da API. Foram divididos em categorias e serão descritos os processos e valores integrados ao projeto.<br><br>

# 🚨 MÓDULO DE AUTENTICAÇÃO<br>

Esta API-Rest contém um módulo de autenticação de usuário e possui as devidas definições de permissões de acesso aos EndPoints através de um Bearer Token. Foram integradas etapas de validação de criação de usuário, login de usuário, recuperação de senha (onde é enviado um e-mail) e resete de senha.<br>

<h2>Atributos Utilizados</h2>

<h3>🔒 Bcrypt</h3>
É um algoritmo de criptografia do tipo Hash para senhas. Onde foi combinado com o Salt (Salted Hashing), que é uma sequência de caracteres, números ou termos adicionados antes da senha, que dão aleatoriedade ao resultado da mesma criptografada, tornando-a mais complexa.

<h3>🔐 Dotenv</h3>
A maioria dos projetos possuem dados sensíveis, como informações do banco de dados, chaves de “API's”, Secret Keys, entre outras informações. Ele serve para adaptar as variáveis ambiente de um projeto, todas as informações sensíveis ficam armazenadas em um arquivo chamado ".env", assim ele fica fora do controle de versão do software como GIT, SVN e outros.

<h3>🗳️ Mongoose</h3>
É uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação. Possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negócios. Isso significa que o Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.

<h3>🗃️ Express</h3>
É um framework web rápido, flexível e minimalista para Node.js, está voltado para a criação e obtenção dos dados a partir do seu servidor, independente da linguagem que os irá utilizar. 

<h3>⛓️ Crypto-JS</h3>
O CryptoJS é uma coleção crescente de algoritmos criptográficos padrão e seguros implementados em JavaScript usando as melhores práticas e padrões. Eles são rápidos e possuem uma interface consistente e simples. 

<h3>🏷️ JSON Web Token (JWT)</h3>
O método JWT  define uma maneira compacta e independente de transmitir informações com segurança entre as partes como um objeto JSON.

<h3>📧 Mailer</h3>
O Mailer tem sido usado com Node.js, um ambiente de execução Javascript server-side, isto é, uma maneira de executar código escrito em javascript do lado do servidor. Uma das eventuais tarefas que o Node.js pode executar é o envio de e-mails. Esta função por ser útil para notificar o contato de possíveis clientes, enviar algum conteúdo para as pessoas que solicitarem, para notificar sobre alguma ação dentro da sua aplicação, etc.

<h3>🔄 Nodemon</h3>
O Nodemon é um utilitário que monitora qualquer alteração na sua fonte e reinicia automaticamente o servidor. Perfeito para o desenvolvimento.

<h3>🚧 Cors</h3>
Cross-origin resource sharing (CORS ou compartilhamento de recursos de origem cruzada) é uma especificação de uma tecnologia de navegadores que define meios para um servidor permitir que seus recursos sejam acessados por uma página web de um domínio diferente.<br><br><br><br><br>

<div align="center">
👉🏼 <a href="https://www.linkedin.com/in/eduardo-pereira-boares/">Veja meu Linkedin</a> 👈🏼
<h5 align="center"> 👨🏻‍💻 Desenvolvido por Eduardo Pereira Boares. 👨🏻‍💻</h5>
<div>
