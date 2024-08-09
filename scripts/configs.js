/**
 * This function calculates the environment in which the site is running based on the URL.
 * It defaults to 'prod'. In non 'prod' environments, the value can be overwritten using
 * the 'environment' key in sessionStorage.
 *
 * @returns {string} - environment identifier (dev, stage or prod'.
 */
export const calcEnvironment = () => {
  const { href } = window.location;
  let environment = 'prod';
  if (href.includes('.hlx.page')) {
    environment = 'stage';
  }
  if (href.includes('localhost')) {
    environment = 'dev';
  }

  const environmentFromConfig = window.sessionStorage.getItem('environment');
  if (environmentFromConfig && environment !== 'prod') {
    return environmentFromConfig;
  }

  return environment;
};

function buildConfigURL(environment) {
  const env = environment || calcEnvironment();
  const configURL = new URL('/content/dam/pdol-site/configs.json');
  console.log(configURL);
  configURL.searchParams.set('sheet', env);
  return configURL;
}

const getConfigForEnvironment = async (environment) => {
  const env = environment || calcEnvironment();
  let configJSON = window.sessionStorage.getItem(`config:${env}`);
  if (!configJSON) {
    configJSON = await fetch(buildConfigURL(env)).then((res) => res.text());
    window.sessionStorage.setItem(`config:${env}`, configJSON);
  }
  if (!configJSON) {
    configJSON = {
      total: 12,
      offset: 0,
      limit: 12,
      data: [
        {
          key: 'commerce-endpoint',
          value: 'https://catalog-service-sandbox.adobe.io/graphql',
        },
        {
          key: 'commerce-environment-id',
          value: 'a96ede16-88d0-45ec-b897-3a6bdca25324',
        },
        {
          key: 'commerce-website-code',
          value: 'wknd',
        },
        {
          key: 'commerce-store-view-code',
          value: 'wknd',
        },
        {
          key: 'commerce-store-code',
          value: 'wknd_store',
        },
        {
          key: 'commerce-customer-group',
          value: 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c',
        },
        {
          key: 'commerce-x-api-key',
          value: 'storefront-widgets',
        },
        {
          key: 'commerce-core-endpoint',
          value: 'https://wknd-commerce.adobedemo.com/graphql',
        },
        {
          key: 'commerce-root-category-id',
          value: '3',
        },
        {
          key: 'aem-host',
          value: 'https://publish-p64656-e692852.adobeaemcloud.com/',
        },
        {
          key: 'aem-graphql-endpoint',
          value: 'aem-demo-assets',
        },
        {
          key: 'adyen-client-key',
          value: 'test_DQGCHYCTAVA63LJNHCE5TQPU3AEIGRZ2',
        },
      ],
      ':type': 'sheet',
    };
  }
  console.log(configJSON);
  return configJSON;
};

/**
 * This function retrieves a configuration value for a given environment.
 *
 * @param {string} configParam - The configuration parameter to retrieve.
 * @param {string} [environment] - Optional, overwrite the current environment.
 * @returns {Promise<string|undefined>} - The value of the configuration parameter, or undefined.
 */
export const getConfigValue = async (configParam, environment) => {
  const env = environment || calcEnvironment();
  const configJSON = await getConfigForEnvironment(env);
  const configElements = JSON.parse(configJSON).data;
  return configElements.find((c) => c.key === configParam)?.value;
};
