# AfoHand PWA – Guia de Configuração

## Como conectar à sua Planilha Google Sheets

### 1. Crie a planilha com estas abas:

#### Aba "Jogos" (colunas obrigatórias):
| grupo | rodada | casa | visitante | gols_casa | gols_visitante | status | data | hora |
|-------|--------|------|-----------|-----------|----------------|--------|------|------|
| A | 1 | Falcões FC | Leões United | 5 | 3 | realizado | 2025-06-01 | 09:00 |
| A | 2 | Falcões FC | Thunder Hand | 0 | 0 | pendente | 2025-06-08 | 09:00 |

- `status`: `realizado` ou `pendente`
- `data`: formato YYYY-MM-DD
- `grupo`: A ou B

#### Aba "MataMata" (colunas obrigatórias):
| fase | time1 | time2 | gols1 | gols2 | status |
|------|-------|-------|-------|-------|--------|
| Semifinal | Falcões FC | Dragões FC | 5 | 4 | realizado |
| Final | Falcões FC |  | 0 | 0 | pendente |

- `fase`: `Quartas de Final`, `Semifinal`, `3º Lugar`, ou `Final`

### 2. Publique a planilha
1. Abra a planilha no Google Sheets
2. Clique em **Arquivo → Compartilhar → Publicar na web**
3. Selecione **Planilha inteira** e formato **CSV**
4. Clique em **Publicar** e confirme
5. Copie o ID da URL (parte entre `/d/` e `/edit`)

### 3. Configure o app
Abra `js/app.js` e substitua:
```js
SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
```
pelo ID da sua planilha.

### 4. Hospede o app
O app precisa ser servido via HTTPS para funcionar como PWA.
Opções gratuitas:
- **GitHub Pages** – suba os arquivos e ative Pages
- **Netlify** – arraste a pasta no netlify.com
- **Vercel** – `vercel deploy`

---
## Estrutura dos arquivos
```
afohand/
├── index.html      # App principal
├── manifest.json   # Config PWA
├── sw.js           # Service Worker (offline)
├── css/
│   └── style.css   # Estilos
├── js/
│   └── app.js      # Lógica + conexão Sheets
└── icons/
    ├── icon-192.png
    └── icon-512.png
```
