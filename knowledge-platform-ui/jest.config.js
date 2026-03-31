export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(png|jpe?g|gif|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
  },
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx', '!src/vite-env.d.ts', '!src/**/index.{js,jsx}', '!src/**/*.d.ts', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
