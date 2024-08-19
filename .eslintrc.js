module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'nestjs'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/heading-has-content': 'off',

    // Включены
    'prettier/prettier': 'off',
    'max-len': ['error', { 'code': 180, 'comments': 512 }],
    'func-names': ['error', 'as-needed'],
    'semi': ['error', 'always'],
    'semi-spacing': ['error', { 'before': false, 'after': true }],
    'no-else-return': 'error',
    'no-prototype-builtins': 'error',
    'no-bitwise': 'error',
    'guard-for-in': 'error',
    'no-mixed-operators': 'error',
    'prefer-arrow-callback': 'error',
    'array-callback-return': 'error',
    'no-use-before-define': 'error',
    'one-var-declaration-per-line': 'error',
    'no-loop-func': 'error',
    'implicit-arrow-linebreak': ['error', 'beside'],
    'no-restricted-globals': ['error', 'event', 'fdescribe'],
    'no-confusing-arrow': 'error',
    'no-nested-ternary': 'error',
    'space-before-blocks': ['error', { 'functions': 'always', 'keywords': 'always', 'classes': 'always' }],
    'max-classes-per-file': ['error', 1],
    'class-methods-use-this': 'error',
    'nonblock-statement-body-position': ['error', 'beside'],
    'brace-style': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'no-multi-spaces': 'error',
    'block-spacing': 'error',
    'key-spacing': 'error',
    'comma-spacing': 'error',
    'padded-blocks': ['error', 'never'],
    'no-multiple-empty-lines': ['error', {
      'max': 2,
      'maxBOF': 0,
      'maxEOF': 1,
    }],
    'lines-between-class-members': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'no-trailing-spaces': ['error'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'no-lonely-if': 'error',
    'no-console': 'error',

    // Отключены
    'quotes': 0,
    'quote-props': 0,
    'arrow-body-style': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'dot-notation': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'operator-assignment': 0,
    'one-var': 0,
    'no-new': 0,
    'new-cap': 0,
    'no-alert': 0,
    'spaced-comment': [0, 'always'],
    'prefer-template': [0],
    'import/named': 0,
    // Спорные
    'jsx-quotes': [0], // FIXME включить
    'consistent-return': 0,
    'comma-dangle': [0, 'never'], // FIXME включить
    'keyword-spacing': 0,
    'no-unused-expressions': 0,

    // TODO второй раунд добавления правил
    'no-shadow': 0, // FIXME можно вклюить, но нужно править около 66 пунктов
    'operator-linebreak': [0, 'after'], // FIXME включть
    'yoda': [0],
    'no-param-reassign': [0], // FIXME включить
    'no-await-in-loop': [0], // FIXME включить
    'import/no-cycle': 'off',
    'function-paren-newline': [0], // FIXME включить ?
    'indent': [0], // FIXME включить
    'prefer-const': [0],
    'object-curly-spacing': [0], // FIXME включить ?
    'prefer-promise-reject-errors': [0], // FIXME включить
    'space-infix-ops': [0], // ЗМ
    'object-property-newline': [0], // FIXME включить
    'curly': [0], // ЗМ
    'object-shorthand': [0], // FIXME включить
    'jsx-a11y/control-has-associated-label': [0],
    'no-unneeded-ternary': [0],
    'no-return-assign': [0], // FIXME включить
    'prefer-object-spread': [0], // FIXME включить

    // Не используем дефолтный экспорт, это приводит к путанице в именах компонентов.
    'import/prefer-default-export': 'off',

    // Данные с бека приходят не в camelcase, поэтому отключаем
    'camelcase': 'off',

    // accessibility не поддерживается
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',

    // не импортируем библиотеку целиком, только нужные функции/модули
    'no-restricted-imports': ['error', {
      'paths': [{
        'name': 'lodash',
        'importNames': ['_'],
      }],
    }],

    // количество условий в функции не должно быть больше 20 (ухудшает производительность и читаемость кода)
    'complexity': ['warn', 20],

    // обязательный default в конструкциях switch case
    'default-case': ['error', { 'commentPattern': '^skip\\sdefault' }],

    // безопасная проверка на null
    'no-eq-null': 'warn',

    // не используем return await в функциях с async
    'no-return-await': 'off',
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/restrict-template-expressions": 'off',
    "@typescript-eslint/no-floating-promises": "off",


    // не присваиваем значения в переменную, уже равную этому значению
    'no-self-assign': 'error',

    // на случай сравнений вида x === x
    'no-self-compare': 'error',

    // убираем ненужные склеивания строк
    'no-useless-concat': 'error',

    // убираем лишний return
    'no-useless-return': 'error',

    // async функции должны содержать await
    'require-await': 'warn',

    // убираем неиспользуемые переменные
    'no-unused-vars': 'off',

    // убираем дублирования в аргументах
    'no-dupe-args': 'error',

    // не оставляем пустые блоки кода и лишние скобки вокруг блоков кода
    'no-empty': 'error',
    'no-lone-blocks': 'error',

    // недостижимый код
    'no-unreachable': 'error',

    "no-unsafe-optional-chaining": 'off',
  },
};
