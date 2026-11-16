type EnvName = 'qa' | 'staging' | 'prod';

interface EnvConfig {
  uiBaseUrl: string;
  apiBaseUrl: string;
}

const environments: Record<EnvName, EnvConfig> = {
  qa: { uiBaseUrl: 'https://www.saucedemo.com', apiBaseUrl: 'https://restful-booker.herokuapp.com' },
  staging: { uiBaseUrl: 'https://www.saucedemo.com', apiBaseUrl: 'https://restful-booker.herokuapp.com' },
  prod: { uiBaseUrl: 'https://www.saucedemo.com', apiBaseUrl: 'https://restful-booker.herokuapp.com' },
};

const envName = (process.env.TEST_ENV ?? 'qa') as EnvName;

if (!environments[envName]) {
  throw new Error(`Unknown TEST_ENV "${envName}". Use one of: ${Object.keys(environments).join(', ')}`);
}

export const env = { name: envName, ...environments[envName] };
