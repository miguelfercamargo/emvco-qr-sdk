module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/tests/**/*.spec.(ts|js)'],
    collectCoverage: true,
    coverageDirectory: 'coverage'
};
