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
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: 'query ($slug: String!) {\n  petBlogsList(filter: {slug: {_expressions: [{value: $slug}]}}) {\n    items {\n      _path\n      title\n      content {\n        html\n      }\n      slug\n    }\n  }\n}\n',
      variables: { slug: queryParams.get('slug') },
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: graphql,
    };

    const final_result = await fetch(AEM_HOST + queryURL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        return (JSON.parse(result).data.petBlogsList.items[0].content.html);
      })
      .catch((error) => console.error(error));
    console.log(final_result);
    return final_result;
  }
}

export default async function decorate(block) {
  const fragment = await loadFragment();
  if (fragment) {
    const fragmentSection = document.querySelector('.petblogsdetail.block');
    console.log(fragmentSection);
    if (fragmentSection) {
      fragmentSection.innerHTML = fragment;
    }
  }
}
