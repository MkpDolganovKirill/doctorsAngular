module.exports = {
  root: true,
  overrides: [
    {
      files: [
        "*.ts",
      ],
      parserOptions: {
        project: [
          "tsconfig.json",
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "airbnb-typescript/base",
        "plugin:import/recommended",
        'prettier',
        'plugin:prettier/recommended'
      ],
      rules: {
        // "import/extensions": "off",
        // "import/no-extraneous-dependencies": "off",
        "import/resolver": "off",
        "import/no-unresolved": "off",
        "import/named": "off",
        "@typescript-eslint/lines-between-class-members": "off",
      },
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", { "code": 140 }]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
}
