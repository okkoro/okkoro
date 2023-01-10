const nextJest = require('next/jest')

// const createJestConfig = nextJest({
//     dir: './',
// })

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    // moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
    // testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    preset: "ts-jest",

}

const createJestConfig = nextJest({dir: './',})(customJestConfig);

module.exports = async () => {
    // Create Next.js jest configuration presets
    const jestConfig = await createJestConfig();

    // Custom `moduleNameMapper` configuration
    const moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@/(.*)$': '<rootDir>/src/$1',
    };

    return { ...jestConfig, moduleNameMapper };
};