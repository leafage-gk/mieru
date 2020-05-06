# mieru

## VSCode plugins requirements

- EditorConfig for VS Code `editorconfig.editorconfig`
- ESLint `dbaeumer.vscode-eslint`
- Prettier - Code formatter `esbenp.prettier-vscode`
- stylelint `stylelint.vscode-stylelint`
- Vetur `octref.vetur`
- Gitmoji Commit `benjaminadk.emojis4git` - optional

### settings.json example

```
{
    "eslint.format.enable": true,
    "eslint.lintTask.enable": true,
    "eslint.packageManager": "yarn",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue"
    ],
    "vetur.experimental.templateInterpolationService": true,
    "vetur.format.defaultFormatter.ts": "none",
    "vetur.format.defaultFormatter.sass": "none",
    "vetur.format.defaultFormatter.scss": "none",
    "vetur.useWorkspaceDependencies": true,
    "vetur.format.defaultFormatter.html": "prettier",
    "stylelint.packageManager": "yarn"
}
```

## install

`$ yarn install`

## generate static web

`$ yarn generate`

## dev

`$ yarn dev`

then, open http://localhost:3000

### commitlint

enforcing gitmoji commit.

Ref: https://github.com/arvinxx/commitlint-config-gitmoji
