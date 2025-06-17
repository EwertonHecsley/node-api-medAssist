<h1 align="center">MediAssist - Geração Inteligente de Laudos Médicos</h1>

<p align="center">
  <strong>Transforme observações clínicas simples em laudos técnicos profissionais com apoio de IA.</strong><br>
  Projeto desenvolvido com Node.js, Fastify, Prisma e integração com IA generativa.
</p>

<hr>

<h2>🧠 Sobre o Projeto</h2>

<p>
  O <strong>MediAssist</strong> é uma API inteligente que auxilia médicos na produção de laudos clínicos com linguagem técnica e estruturada. O sistema permite que o profissional envie uma descrição simples do estado do paciente — seja por texto informal ou ditado — e receba um laudo técnico com vocabulário clínico adequado.
</p>

<p>
  A aplicação de <strong>Inteligência Artificial (IA)</strong> permite padronizar os registros médicos, melhorar a comunicação clínica e reduzir o tempo de escrita manual de documentos.
</p>

<h3>🎯 Problema que resolvemos</h3>

<p>
  Profissionais da saúde, especialmente em atendimentos de alta demanda, têm pouco tempo para redigir laudos completos e tecnicamente padronizados. Com o MediAssist, o médico pode:
</p>

<ul>
  <li>Descrever a situação do paciente de forma natural;</li>
  <li>Receber automaticamente uma versão aprimorada em linguagem clínica;</li>
  <li>Salvar esse laudo em banco de dados, com vínculo ao paciente e médico responsáveis.</li>
</ul>

<hr>

<h2>⚙️ Tecnologias Utilizadas</h2>

<ul>
  <li><strong>Node.js + TypeScript</strong></li>
  <li><strong>Fastify</strong> – Framework de alta performance</li>
  <li><strong>Prisma ORM</strong> – Integração com banco de dados PostgreSQL</li>
  <li><strong>IA Generativa (Gemini API)</strong> – Transformação de texto informal em linguagem clínica</li>
</ul>

<hr>

<h2>🩺 Exemplo de Uso</h2>

<h4>📤 Requisição</h4>

<pre><code>
POST /v1/medical-reports
Content-Type: application/json

{
  "doctorId": "2b7c25e8-33a7-4b6c-bf9e-d41db2da8fc5",
  "pacientId": "54777305-965f-41fe-8534-d5d61971f072",
  "originalText": "Paciente esta muito quente, e perdeu um muito peso sem saber o motivo, tem que fazer exames para ver oque foi."
}
</code></pre>

<h4>✅ Resposta</h4>

<pre><code>
{
  "message": "Created Report Sucessfully",
  "medicalReport": {
    "id": "122ef7d6-e641-4140-afcc-34a395fcc1cb",
    "doctorId": "2b7c25e8-33a7-4b6c-bf9e-d41db2da8fc5",
    "pacientId": "54777305-965f-41fe-8534-d5d61971f072",
    "report": "Paciente apresenta hipertermia e perda ponderal significativa não intencional. Necessário investigar a etiologia através de exames complementares.",
    "createdAt": "2025-06-17T20:37:13.154Z"
  }
}
</code></pre>

<p><em>Observe como a IA converteu a entrada simples em um laudo técnico padronizado.</em></p>

<hr>

<h2>🔗 Principais Rotas</h2>

<table>
  <thead>
    <tr>
      <th>Método</th>
      <th>Endpoint</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>POST</code></td>
      <td><code>/v1/medical-reports</code></td>
      <td>Cria um novo laudo com base no texto original e aplica IA para melhorar a linguagem.</td>
    </tr>
    <tr>
      <td><code>GET</code></td>
      <td><code>/v1/pacient</code></td>
      <td>Lista todos os pacientes cadastrados.</td>
    </tr>
    <tr>
      <td><code>POST</code></td>
      <td><code>/v1/pacient</code></td>
      <td>Cria um novo paciente.</td>
    </tr>
  </tbody>
</table>

<p><strong>Prefixo global das rotas:</strong> <code>/api</code></p>

<hr>

<h2>📦 Estrutura de Pastas</h2>

<pre><code>
mediassist/
├── apps/
│   └── atendimento/         # Entrada da API (Fastify)
├── packages/
│   ├── domain/              # Entidades, Repositórios, Casos de Uso
│   └── infra/
│       ├── prisma/          # Configurações e repositórios Prisma
│       └── service/         # Conexão com IA
├── .env
├── docker-compose.yml       # Banco de dados PostgreSQL
└── README.md
</code></pre>

<hr>

<h2>🚀 Executando Localmente</h2>

<h4>📦 Requisitos</h4>
<ul>
  <li>Node.js 18+</li>
  <li>Docker</li>
  <li>Conta com acesso à API do Gemini (ou outro LLM)</li>
</ul>

<h4>💻 Passos</h4>

<pre><code>
# Clone o repositório
git clone https://github.com/seuusuario/mediassist.git

# Instale as dependências
cd mediassist
npm install

# Suba o banco de dados
docker-compose up -d

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npx prisma migrate dev

# Inicie a API
npm run dev
</code></pre>

<hr>

<h2>📚 Considerações Finais</h2>

<p>
  Este projeto é uma prova de conceito prática do uso de IA generativa no auxílio à medicina, mas com estrutura de código realista e escalável. Mesmo usando chamadas síncronas agora, o código está preparado para evoluir futuramente com filas e arquitetura distribuída.
</p>

<p>
  O MediAssist demonstra que é possível aplicar IA em problemas reais, com impacto direto na rotina médica, reduzindo tempo e melhorando a comunicação profissional.
</p>

<p><strong>Desenvolvido com dedicação por Ewerton Hecsley.</strong></p>
