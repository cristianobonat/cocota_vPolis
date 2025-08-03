## COCOTA_vPolis
**COCOTA_vPolis** é um portal web com estética retrô de "jornal antigo", projetado para ser uma rede social descentralizada e uma plataforma para aplicativos didáticos.

### Visão Geral
O projeto visa criar um ambiente onde os usuários possam não apenas interagir, mas também criar e gerenciar seu próprio conteúdo web de forma independente. As "Polis" (sub-páginas) criadas pelos usuários podem ser exportadas como arquivos HTML autocontidos, permitindo que sejam hospedadas em qualquer servidor, promovendo uma web mais livre e descentralizada.

### Funcionalidades Atuais
**Portal de Login**: Interface de entrada com estética de jornal antigo.

**Gerenciador de Polis**: Permite que usuários criem, salvem e visualizem suas próprias páginas web (usando HTML básico).

**Exportação para HTML**: Cada "Polis" pode ser baixada como um arquivo .html independente.

**Editor Markdown Didático**: Uma ferramenta de dois painéis para escrever em Markdown e ver a formatação renderizada em tempo real.

*Persistência de Dados*: Utiliza o Firebase Firestore para salvar as páginas dos usuários de forma segura.

### Estrutura Tecnológica
**Frontend**: React.js

**Estilização**: Tailwind CSS

**Banco de Dados**: Google Firebase (Firestore)

**Autenticação**: Google Firebase (Auth)

### Como Iniciar o Projeto Localmente
Para rodar este projeto em seu ambiente de desenvolvimento, siga os passos abaixo.

#### Pré-requisitos
Node.js (versão 16 ou superior)

npm (geralmente vem com o Node.js)

#### Instalação
* item 1 **Clone o repositório**:

> git clone https://[URL_DO_SEU_REPOSITORIO]/COCOTA_vPolis.git
> cd COCOTA_vPolis

#### Instale as dependências:

> npm install

* item 1 **Configure o Firebase**:

* item * Crie um projeto no console do Firebase.

* item * Crie um arquivo src/firebase/config.js.

* item * Adicione suas credenciais do Firebase a este arquivo.

* item 1 **Inicie o servidor de desenvolvimento**:

> npm start

O aplicativo estará disponível em http://localhost:3000.

### Planos Futuros
* item * Implementar um sistema de autenticação completo com senhas criptografadas.

* item * Adicionar papéis de usuário (Administrador, Usuário).

* item * Expandir a suíte de "Apps Disponíveis" com mais ferramentas didáticas.
