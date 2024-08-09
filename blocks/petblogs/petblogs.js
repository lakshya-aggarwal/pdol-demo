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
export async function loadFragment() {
  {
    const myHeaders = new Headers();

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    let final_main = document.createElement('main');
    const resp = await fetch('https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json/pdol-site/blogs-all', requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
          console.log(result);
          console.log(result.data.petBlogsList);
          const main = document.createElement('main');
          main.innerHTML = result.data.petBlogsList.items[0].title;

          decorateMain(main);
          await loadBlocks(main);
          console.log(main);
          final_main=main;
          return main;
      })
      .catch((error) => console.error(error));
    /* if (resp) {
      const fragment = document.createElement('div');
      fragment.innerHTML = resp.data;
      return fragment;
    } */
      return final_main;
  }
  // console.log("yash");
}

export default async function decorate(block) {
    const fragment = await loadFragment();
    console.log(fragment.textContent);
  if (fragment) {
    const fragmentSection = document.querySelector('main .section.petblogs-container .petblogs-wrapper .petblogs');
    const title_element = document.createElement('h4');
    title_element.textContent = fragment.textContent;
    fragmentSection.appendChild(title_element);
  }
}
