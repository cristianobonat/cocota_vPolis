@echo off
REM Script para automatizar a instalação e inicialização do projeto COCOTA_vPolis no Windows

echo Iniciando o setup do COCOTA_vPolis...
echo.

REM Passo 1: Instalar as dependências do Node.js
echo "---> Instalando dependencias com 'npm install'... (Isso pode levar alguns minutos)"
npm install

IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao instalar as dependencias. Verifique seu ambiente Node.js e npm.
    pause
    exit /b
)

echo.
echo "---> Dependencias instaladas com sucesso!"
echo.

REM Passo 2: Abrir o navegador na porta 3000
REM Usamos um timeout para dar tempo ao servidor de desenvolvimento para iniciar.
echo "---> Abrindo o navegador em http://localhost:3000 em 5 segundos..."
timeout /t 5 /nobreak > NUL
start http://localhost:3000

REM Passo 3: Iniciar o servidor de desenvolvimento do React
echo.
echo "---> Iniciando o servidor de desenvolvimento com 'npm start'..."
npm start


