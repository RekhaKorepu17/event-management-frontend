module.exports = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", 
  },
};