#!/bin/bash

# Script para automatizar a instalação e inicialização do projeto COCOTA_vPolis em Linux/macOS
# Versão 2: Adicionada verificação de dependência (Node.js/npm)

# Cores para o terminal
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Sem Cor

echo -e "${GREEN}Iniciando o setup do COCOTA_vPolis...${NC}"

# --- Verificação de Dependências ---
# Primeiro, verifica se o comando 'npm' está disponível
if ! command -v npm &> /dev/null
then
    # Se 'npm' não for encontrado, exibe uma mensagem de ajuda e sai
    echo -e "\n${YELLOW}ERRO: O comando 'npm' nao foi encontrado.${NC}"
    echo "Node.js e npm sao necessarios para rodar este projeto."
    echo "A maneira recomendada de instalar e gerenciar o Node.js e usando o NVM (Node Version Manager)."
    echo ""
    echo -e "${GREEN}Para instalar o NVM e o Node.js, siga estes passos:${NC}"
    echo "1. Execute o comando abaixo para baixar e rodar o script de instalacao do NVM:"
    echo -e "${YELLOW}   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash${NC}"
    echo ""
    echo "2. Apos a conclusao, FECHE e REABRA seu terminal para carregar o NVM."
    echo ""
    echo "3. No novo terminal, instale a versao mais recente de suporte a longo prazo (LTS) do Node.js:"
    echo -e "${YELLOW}   nvm install --lts${NC}"
    echo ""
    echo "4. Apos a instalacao, execute este script (./start.sh) novamente."
    exit 1
fi

echo -e "\n${GREEN}---> Dependencia 'npm' encontrada! Prosseguindo...${NC}"

# Passo 1: Instalar as dependências do Node.js
echo -e "\n${GREEN}---> Instalando dependencias com 'npm install'... (Isso pode levar alguns minutos)${NC}"
npm install

# Verificar se a instalação foi bem-sucedida
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Erro ao instalar as dependencias. Verifique seu ambiente Node.js e npm.${NC}"
  exit 1
fi

echo -e "\n${GREEN}---> Dependencias instaladas com sucesso!${NC}"

# Passo 2: Abrir o navegador na porta 3000
echo -e "\n${GREEN}---> Abrindo o navegador em http://localhost:3000 em 5 segundos...${NC}"

( sleep 5;
  if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
  elif command -v open &> /dev/null; then
    open http://localhost:3000
  else
    echo "Nao foi possivel abrir o navegador automaticamente. Por favor, acesse http://localhost:3000 manualmente."
  fi
) &

# Passo 3: Iniciar o servidor de desenvolvimento do React
echo -e "\n${GREEN}---> Iniciando o servidor de desenvolvimento com 'npm start'...${NC}"
npm start

