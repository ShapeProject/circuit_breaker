/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  // コンパイルオプションがpreserveのため、tsconfig.test.jsonを読み込む
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "tsconfig.test.json"
  //   }
  // },
  // 下記の書き方が推奨されている？
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/dist/'],
  testMatch: ['**/*.test.ts*', '!**/extra*.test.ts*'],
};

export default config;

// const nextJest = require('next/jest');

// const createJestConfig = nextJest({
//   dir: './',
// });

// /** @type {import('jest').Config} */
// const customJestConfig = {
//   moduleDirectories: ['node_modules', '<rootDir>/'],
//   testEnvironment: 'jest-environment-jsdom',
//   setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
// };

// module.exports = createJestConfig(customJestConfig);
