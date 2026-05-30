# 🎭 Automação de Testes E2E — Mark App

![Tests](https://github.com/thomazvictorr/playwright-mark/actions/workflows/ci.yml/badge.svg)

Projeto de automação de testes end-to-end para a aplicação **Mark** (gerenciador de tarefas), desenvolvido com **Playwright** + **TypeScript** e integrado ao **GitHub Actions**.

> A aplicação-alvo é baseada no curso do Fernando Papito. Este repositório contém os testes de automação e a aplicação necessária para executá-los.

---

## 🧪 Cobertura de Testes

| Módulo | Cenários |
|--------|----------|
| Cadastro | Nova tarefa, tarefa duplicada, campo obrigatório, contagem após cadastro, caracteres especiais |
| Atualização | Concluir tarefa, reabrir tarefa concluída |
| Exclusão | Excluir tarefa, contagem após exclusão |

**Total: 9 casos de teste** com Page Object Model e massa de dados via JSON

---

## 🏗️ Estrutura do Projeto

```
├── apps/
│   ├── api/                     # API da aplicação (Node.js + SQLite)
│   └── web/                     # Front-end da aplicação
├── tests/
│   ├── fixtures/
│   │   ├── task.model.ts        # Interface TypeScript
│   │   └── tasks.json           # Massa de dados
│   ├── support/
│   │   ├── helpers.ts           # Funções auxiliares de API
│   │   └── pages/tasks/
│   │       └── index.ts         # Page Object - TasksPage
│   └── tasks.spec.ts            # Casos de teste
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline GitHub Actions
├── playwright.config.ts
└── package.json
```

---

## 🚀 Como executar localmente

**Pré-requisitos:** Node.js 18+

```bash
# Instalar dependências dos testes
npm install

# Instalar browsers
npx playwright install chromium

# Instalar dependências da API
cd apps/api && yarn install

# Inicializar banco de dados
./node_modules/typeorm/cli.js migration:run

# Iniciar API (porta 3333)
node src/server.js

# Instalar dependências do Web e iniciar (porta 8080)
cd ../web && yarn install && npx http-server --port 8080

# Criar arquivo de variáveis de ambiente na raiz
echo "BASE_URL=http://localhost:8080" > .env
echo "BASE_API=http://localhost:3333" >> .env

# Executar testes
npm test

# Ver relatório
npm run test:report
```

---

## ⚙️ CI/CD com GitHub Actions

Os testes são executados automaticamente a cada **push**, **pull request** e todo **dia útil às 8h**. O pipeline sobe a API e o front-end antes de rodar os testes.

O relatório é publicado automaticamente via **GitHub Pages** após cada execução.

📄 **[Ver último relatório](https://thomazvictorr.github.io/playwright-mark/report/index.html)**

---

## 🛠️ Tecnologias

- [Playwright](https://playwright.dev/) — framework de automação E2E
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- Padrão **Page Object Model** para organização dos testes

---

## 👨‍💻 Autor

**Thomáz Victor** — [LinkedIn](https://www.linkedin.com/in/thomazvictorr/) | [GitHub](https://github.com/thomazvictorr)
