/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Si usas CSS o imágenes en tus componentes, evita errores de importación
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/components/Header.tsx',
    'src/app/components/NotificationBell.tsx',
  ],
  coverageThreshold: {
    global: {
      lines: 80,
    },
  },
  coverageDirectory: "coverage",
};
