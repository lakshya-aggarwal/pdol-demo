import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadBlocks,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
async function loadFragment() {
  {
    const myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const resp = await fetch('https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json/pdol-site/blogs-all', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.data.petBlogsList);
        const main = document.createElement('main');
        main.innerHTML = result.data.petBlogsList.items[0].title;
        decorateMain(main);
        loadBlocks(main);
        return main;
      })
      .catch((error) => console.error(error));
    /* if (resp) {
      const fragment = document.createElement('div');
      fragment.innerHTML = resp.data;
      return fragment;
    } */
  }
  return null;
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
