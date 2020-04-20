module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen', // @NOTE: We explicity need to reference JSDOM v16 since JEST uses by default an older version of JSDOM that does not support Custom Elements
  transform: {
    "\\.(js|ts)$": "babel-jest"
  },
  moduleNameMapper: {
    ".+\\.(css|scss)$": "babel-jest" // @NOTE: Required to import .css / .scss files in JS
  }
};