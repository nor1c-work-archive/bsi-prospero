# ProERMS BSI

## Prerequisites

- Node.js >= v16
- Yarn v1.22.19

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) +
[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) +
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) +
[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Prettier Config

VSCode Preferences: Open Settings (JSON)
`ctrl + shift + p > Preference: Open Settings(JSON)`

add this config to settings.JSON

```JSON
"editor.formatOnSave":  false,
"[typescript]":  {
  "editor.formatOnSave":  true,
  "editor.defaultFormatter":  "esbenp.prettier-vscode"
},
"prettier.prettierPath": "./node_modules/prettier"

```

Or you can setting up with Docker by running Docker Manager (runner)

## Conventional Commit

Write your commits following the rules of Conventional Commit. Examples:

```bash
feat: added user api
```

```bash
fix(user): fixed failed to login
```
