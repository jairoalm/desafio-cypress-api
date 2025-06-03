# Projeto da API Serverest

O ServeRest é uma API REST gratuita que simula uma loja virtual com intuito de servir de material de estudos de testes de API.

## Índice
- <a href="#funcionalidades">Funcionalidades do Projeto</a>
- <a href="#documentacao">Documentação da API</a>
- <a href="#tecnologias">Tecnologias Utilizadas</a>
- <a href="#bibliotecas">Bibliotecas Existentes no Projeto</a>
- <a href="#dependencias">Instalação de Dependências</a>
- <a href="#rodar">Como Executar o Projeto</a>
- <a href="#relatorios">Gerar Relatórios</a>
- <a href="#github">Versionamento no GitHub</a>
- <a href="#autores">Autores</a>

## Funcionalidades do Projeto
- [x] Cadastro de Usuário
- [x] Login
- [x] Cadastro de Produtos
- [x] Carrinho de Compras

## Documentação da API
- [x] [Documentação Oficial da API Serverest](https://serverest.dev/#/)

## Tecnologias Utilizadas

- [x] [Node.js](https://nodejs.org/en/download/prebuilt-installer)
- [x] [cypress](https://docs.cypress.io/app/get-started/install-cypress)
- [x] [javascript]

## Bibliotecas Existentes no Projeto

- [x] [cypress](https://docs.cypress.io/app/get-started/install-cypress)
- [x] [faker](https://fakerjs.dev/guide/)
- [x] [allure-report](https://allurereport.org/docs/cypress/)
- [x] [allure-commandline](https://www.npmjs.com/package/allure-commandline)

## Instalações de Dependências

- [x] [git-clone-HTTPS](https://github.com/jairoalm/desafio-cypress-api.git)

```
- npm install ou yarn install
- npm install cypress --save-dev
- npm install @faker-js/faker --save-dev ou npm install faker --save-dev
- npm install --save-dev allure-cypress
- npm i allure-commandline

```

## Como Executar o projeto
```
- Executar projeto completo
    - Modo interativo (UI)
        - npm run cy:open ou npx cypress open
    - Modo headless (terminal)
        - npm run cy:headless ou npx cypress headless
- Executar com arquivo especifico
    - npm run cy:open --spec "cypress/e2e/<pasta>/<file_teste>.js
    - npm run cy:headless --spec "cypress/e2e/<pasta>/<file_teste>.js

```
## Gerar Relatórios
```
- Executar o projeto
- Executar o allure-commandline no terminal
    - npx allure serve allure-results (Esse comando gera um relatório em página HTML)
```

## Versionamento no Github

- [x] [GitHub](https://github.com/jairoalm/desafio-cypress-api)
- [x] [Relatório-Page](https://github.com/jairoalm/desafio-cypress-api/settings/pages)
- [x] [Pipeline](https://github.com/jairoalm/desafio-cypress-api/actions)

## Autores
- [x] [Linkedin](https://www.linkedin.com/in/jairoalmeidamonteiro/)
