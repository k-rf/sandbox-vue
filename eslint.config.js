const pluginCspell = require("@cspell/eslint-plugin");
const pluginTypeScript = require("@typescript-eslint/eslint-plugin");
const typescriptEslintParser = require("@typescript-eslint/parser");
const pluginPrettier = require("eslint-config-prettier");
const pluginImport = require("eslint-plugin-import");
const pluginSonarJs = require("eslint-plugin-sonarjs");
const pluginUnusedImport = require("eslint-plugin-unused-imports");

/** @type { import("eslint").Linter.FlatConfig } */
const ignorePattern = {
  ignores: ["**/dist", "**/node_modules", "**/*.config.{,m,c}js"],
};

/** @type { import("eslint").Linter.FlatConfig } */
const importResolver = {
  files: ["**/*.{,m,c}{t,j}s"],
  plugins: {
    import: pluginImport,
    "unused-imports": pluginUnusedImport,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: ["**/*.{,m,c}{t,j}s"],
      },
      typescript: {
        project: ["**/tsconfig.json"],
      },
    },
  },

  rules: {
    ...pluginImport.configs["recommended"].rules,
    ...pluginImport.configs["typescript"].rules,

    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: false },
      },
    ],

    "unused-imports/no-unused-imports": "error",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const baseRules = [ignorePattern, importResolver];

/** @type { import("eslint").Linter.FlatConfig } */
const tsRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": pluginTypeScript,
    "@cspell": pluginCspell,
    sonarjs: pluginSonarJs,
  },
  rules: {
    ...pluginTypeScript.configs["eslint-recommended"].rules,
    ...pluginTypeScript.configs["recommended"].rules,
    ...pluginSonarJs.configs["recommended"].rules,
    ...pluginCspell.configs["recommended"].rules,
    ...pluginPrettier.rules,

    "object-shorthand": ["error", "never"],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
const specRules = {
  files: ["**/*.spec.{,c,m}{j,t}s"],
  plugins: {
    sonarjs: pluginSonarJs,
  },
  rules: {
    "sonarjs/no-duplicate-string": "off",
  },
};

module.exports = [...baseRules, tsRules, specRules];
