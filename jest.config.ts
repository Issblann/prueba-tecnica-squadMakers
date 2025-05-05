import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/*.spec.ts'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};

export default config;
