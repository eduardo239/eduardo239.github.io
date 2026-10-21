/* ==========================================================================
 *  CONFIGURAÇÃO DO PORTFÓLIO
 *  Edite apenas este arquivo para atualizar o site.
 * ========================================================================== */

const PROFILE = {
  name: "eduardo239",
  handle: "seuuser",
  // Frases que aparecem digitadas abaixo do nome (em loop)
  roles: ["dev full-stack", "extensions dev", "cloud computing"],
  bio: "Construo ferramentas pequenas que resolvem problemas reais. Abaixo está tudo que já saiu do meu terminal.",
  location: "Brasil",
  stack: "js · python",
  status: "disponível",
  links: [
    { label: "github", url: "https://github.com/seuuser" },
    { label: "email", url: "mailto:voce@exemplo.com" },
  ],
};

/* Tipos de projeto. A chave é usada no campo `type` de cada projeto.
 * `tag` aparece no card, `label` no filtro, `color` é a cor de destaque. */
const TYPES = {
  extension: { label: "extensões", tag: "EXT", color: "#ff2bd6" },
  webapp: { label: "web apps", tag: "WEB", color: "#00f0ff" },
  cli: { label: "cli", tag: "CLI", color: "#39ff88" },
  lib: { label: "libs", tag: "LIB", color: "#f5e663" },
  bot: { label: "bots", tag: "BOT", color: "#ff8a3d" },
};

/* Lista de projetos (aparecem nesta ordem).
 * status: 'online' | 'wip' | 'archived'
 * links:  quantos quiser — { label, url } */
const PROJECTS = [
  {
    title: "Password Generator",
    type: "extension",
    status: "online",
    year: 2026,
    description:
      "Extensão Firefox/Chrome que salva e restaura grupos de abas com um atalho. Sincroniza via storage do navegador.",
    tags: ["webextensions", "javascript", "firefox", "chrome"],
    links: [
      {
        label: "github",
        url: "https://github.com/eduardo239/extension-password-generator",
      },
      {
        label: "firefox",
        url: "https://addons.mozilla.org/en-US/firefox/addon/one-click-password-generator/",
      },
      {
        label: "chrome",
        url: "https://chromewebstore.google.com/detail/one-click-password-genera/mibmfmhmcdacfcikmbimkookmdffkjdi?hl=pt-BR&authuser=0",
      },
    ],
  },
  {
    title: "Youtube Auto Theater",
    type: "extension",
    status: "online",
    year: 2026,
    description:
      "Generate a strong random password and copy it to your clipboard in one click.",
    tags: ["webextensions", "javascript", "firefox", "chrome"],
    links: [
      {
        label: "github",
        url: "https://github.com/eduardo239/youtube-auto-theater",
      },
      {
        label: "firefox",
        url: "https://addons.mozilla.org/en-US/firefox/addon/youtube-auto-theater/",
      },
      {
        label: "chrome",
        url: "https://chromewebstore.google.com/detail/youtube-auto-theater/ifklmbiafhbeimgkldikeebjipifolca?authuser=0&hl=pt-BR",
      },
    ],
  },
  {
    title: "NeonNotes",
    type: "webapp",
    status: "online",
    year: 2026,
    description:
      "Web app de notas em markdown, offline-first, com atalhos de teclado estilo vim.",
    tags: ["pwa", "typescript", "indexeddb"],
    links: [
      { label: "demo", url: "https://seuuser.github.io/neonnotes" },
      { label: "github", url: "https://github.com/seuuser/neonnotes" },
    ],
  },
  {
    title: "CookieJar",
    type: "extension",
    status: "wip",
    year: 2026,
    description:
      "Inspeciona e limpa cookies por domínio, com regras automáticas por site.",
    tags: ["webextensions", "privacy"],
    links: [{ label: "github", url: "https://github.com/seuuser/cookiejar" }],
  },
  {
    title: "portscan-lite",
    type: "cli",
    status: "online",
    year: 2025,
    description:
      "Scanner de portas minimalista para a própria rede local, com saída colorida e export em JSON.",
    tags: ["python", "networking", "cli"],
    links: [
      { label: "github", url: "https://github.com/seuuser/portscan-lite" },
    ],
  },
  {
    title: "Pixel Budget",
    type: "webapp",
    status: "archived",
    year: 2024,
    description:
      "Controle de gastos mensais com gráficos e importação de CSV do banco.",
    tags: ["react", "charts", "csv"],
    links: [
      { label: "github", url: "https://github.com/seuuser/pixel-budget" },
    ],
  },
  {
    title: "deploy-bot",
    type: "bot",
    status: "online",
    year: 2025,
    description:
      "Bot de Discord que avisa quando um deploy termina e mostra o diff do commit.",
    tags: ["node", "discord", "webhooks"],
    links: [{ label: "github", url: "https://github.com/seuuser/deploy-bot" }],
  },
];
