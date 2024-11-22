const Configuration = {
  extends: ["gitmoji"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "init", // 初始化
        "release", // 发布新版本
        "style", // 代码风格修改（不影响代码运行的变动）
        "feat", // 添加新功能
        "fix", // 修复 bug
        "docs", // 对文档进行修改
        "refactor", // 代码重构（既不是新增功能，也不是修改 bug 的代码变动）
        "perf", // 提高性能的代码修改
        "dx", // 优化开发体验
        "workflow", // 工作流变动
        "types", // 类型声明修改
        "wip", // 工作正在进行中
        "test", // 测试用例添加及修改
        "build", // 影响构建系统或外部依赖关系的更改
        "ci", // 更改 CI 配置文件和脚本
        "chore", // 其它不涉及源码以及测试的修改
        "deps", // 依赖项修改
        "release", // 发布新版本
      ],
    ],
  },
};

export default Configuration;
