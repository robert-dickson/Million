module.exports = {
  testEnvironment: 'jsdom',
  collectCoverage: true,
  maxWorkers: '50%',
  transform: {
    '.(ts)': 'ts-jest',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!src/**/index.*',
    '!src/**/structs.ts',
    '!src/**/schedule.ts',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
