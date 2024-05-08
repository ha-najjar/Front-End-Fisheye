import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"], 
    languageOptions: {sourceType: "script"},
    rules: {     
      indent: ["error", 4],
      quotes: ["error", "single"],
      semi: ["warn", "always"],
      "no-unused-vars": "off",
      "no-undef": "off",
    }
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
];