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
    myHeaders.append('Cookie', 'affinity="16fcc1e086efed46"');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'manual',
    };

    const resp = await fetch('https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json/pdol-site/blogs-by-slug;slug=dog-food', requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    if (resp.ok) {
      const main = document.createElement('main');
      main.innerHTML = await resp.text();
      decorateMain(main);
      await loadBlocks(main);
      return main;
    }
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
