import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  getMetadata,
  loadBlocks,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
async function loadFragment() {
  {
    /* Hardcoded endpoint */
    const AEM_HOST = 'https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json';
    const queryURL = '/pdol-site/blogs-by-slug';

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: 'query ($slug: String!) {\n  petBlogsList(filter: {slug: {_expressions: [{value: $slug}]}}) {\n    items {\n      _path\n      title\n      content {\n        html\n      }\n      slug\n    }\n  }\n}\n',
      variables: { slug: 'dog-food' },
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
    };

    fetch(AEM_HOST + queryURL, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}

export default async function decorate(block) {
  const fragment = await loadFragment();
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.closest('.section').classList.add(...fragmentSection.classList);
      block.closest('.fragment').replaceWith(...fragment.childNodes);
    }
  }
}
