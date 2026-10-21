# ~/projetos

Portfólio estático com tema terminal/cyberpunk. HTML + CSS + JS puro — sem build, pronto para o GitHub Pages.

## Editar conteúdo

Tudo fica em [`js/projects.js`](js/projects.js):

- `PROFILE` — nome, handle, frases digitadas, bio, links.
- `TYPES` — categorias (extensão, web app, cli…), com tag e cor de destaque.
- `PROJECTS` — a lista de projetos:

```js
{
  title: 'Meu Projeto',
  type: 'extension',          // chave de TYPES
  status: 'online',           // 'online' | 'wip' | 'archived'
  year: 2026,
  description: 'O que ele faz.',
  tags: ['javascript', 'firefox'],
  links: [{ label: 'github', url: 'https://github.com/...' }],
}
```

## Rodar localmente

Abra o `index.html` no navegador, ou:

```sh
python3 -m http.server 8000
```

## Publicar no GitHub Pages

1. Crie um repositório (ex.: `seuuser.github.io` para ficar na raiz do domínio).
2. Envie estes arquivos para a branch `main`.
3. Em **Settings → Pages**, escolha **Deploy from a branch** → `main` / `/ (root)`.

Atalhos: `/` foca a busca, `Esc` limpa. Filtros ficam na URL (ex.: `#extension`).
