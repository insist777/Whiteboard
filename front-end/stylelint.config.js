module.exports = {
  root: true,
  defaultSeverity: 'error',
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-html/vue'],
  plugins: ['stylelint-order'],
  customSyntax: 'postcss-html',
  rules: {
    // 不允许未知函数
    'function-no-unknown': null,
    // 指定类选择器的模式
    'selector-class-pattern': null,
    // 禁止空源码
    'no-empty-source': null,
    // 指定字符串使用单引号
    'string-quotes': 'single',
    // 禁止未知的@规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
        ],
      },
    ],
    // 指定@规则名的大小写
    'at-rule-name-case': 'lower',
    // 指定缩进
    indentation: [
      2,
      {
        severity: 'warning',
      },
    ],
    // 不允许值使用供应商前缀
    'value-no-vendor-prefix': null,
    // 禁止未知的伪类选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    // 禁止未知的伪元素选择器
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    // 不允许未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: [
        'stylelint-config-recommended',
        'stylelint-config-html',
        'stylelint-config-recommended-vue',
      ],
      rules: {
        // 指定关键帧名称的模式
        'keyframes-name-pattern': null,
        // 禁止未知的伪类选择器
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global'],
          },
        ],
        // 禁止未知的伪元素选择器
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
      extends: ['stylelint-config-standard'],
    },
  ],
};
