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
    const final_main = document.createElement('main');

    /* Hardcoded endpoint */
    const AEM_HOST = 'https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json';
    const queryURL = '/pdol-site/blogs-all';

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: 'query {\n  petBlogsList {\n    items {\n      _path\n      title\n      slug\n    }\n  }\n}\n',
      variables: {},
    });
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    const final_result= await fetch(AEM_HOST + queryURL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        return (JSON.parse(result)).data.petBlogsList.items;
      })
      .catch((error) => console.error(error));
    // testing code
    class content {
      constructor(image, title, text) {
        this.image = image;
        this.title = title;
        this.text = text;
      }
    }

    const content_array = [];
    final_result.forEach((item) => {
      const temp_content=new content;
      temp_content.title = item.slug;
      temp_content.text = item.title;
      temp_content.image ='/media_16b2a614aaade492de19e4353c68bdff7353bd6c8.png?width=750&format=png&optimize=medium';
      content_array.push(temp_content);
    })
    return content_array;
  }
}

export default async function decorate(block) {
  const content_array = await loadFragment();
  console.log(content_array);
  if (Array.isArray(content_array)) {
    const petblogSection = document.querySelector('main .section.petblogs-container .petblogs-wrapper .petblogs');
    const unordered_list = document.createElement('ul');
    petblogSection.appendChild(unordered_list);
    content_array.forEach((item) => {
      const list_element = document.createRange().createContextualFragment(`
      <li><div data-valign="middle" class="cards-card-image">
              <picture><source type="image/webp" srcset="${item.image}"><img loading="lazy" alt="" src="${item.image}"></picture>
            </div><div data-valign="middle" class="cards-card-body">
              <p><strong>${item.title}</strong></p>
              <p>${item.text}</p>
              <p class="button-container"><a href="/blogs/petblogsdetail?slug=${item.title}" title="Read Blog" class="button">Read Blog</a></p>
            </div></li>`);
      const ul_element = document.querySelector('main .section.petblogs-container .petblogs-wrapper .petblogs ul');
      ul_element.appendChild(list_element);
    });
    console.log(petblogSection);
  }
}
