import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  {
    ignores: ["node_modules", "dist", "public"],
  },

  /** js推荐配置 */
  eslint.configs.recommended,
  /** ts推荐配置 */
  ...tseslint.configs.recommended,
  /** vue推荐配置 */
  ...eslintPluginVue.configs["flat/recommended"],

  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    jsx: true,
    braceStyle: "1tbs",
    arrowParens: "always",
    commaDangle: [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "never",
        importAttributes: "always-multiline",
        dynamicImports: "always-multiline",
      },
    ],
  }),

  /**
   * javascript 规则
   */
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    rules: {
      "no-console": "warn",
    },
  },

  /**
   * 配置全局变量
   */
  {
    languageOptions: {
      globals: {
        ...globals.browser,

        /** 追加一些其他自定义全局规则 */
        wx: true,
      },
    },
  },

  /**
   * vue 规则
   */
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: "latest",
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      "vue/no-mutating-props": [
        "error",
        {
          shallowOnly: true,
        },
      ],
    },
  },

  /**
   * typescript 规则
   */
  {
    files: ["**/*.{ts,tsx,vue}"],
    rules: {},
  },

  // eslint-disable-next-line @stylistic/comma-dangle
  eslintPluginPrettierRecommended
);
