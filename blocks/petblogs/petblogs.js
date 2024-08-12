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

//testing code
//     class content {
//       constructor(image, title, text) {
//         this.image = image;
//         this.title = title;
//         this.text = text;
//       }
//     }
//
//     const content_array = [];
//     content_array.push(new content('/media_16b2a614aaade492de19e4353c68bdff7353bd6c8.png?width=750&format=png&optimize=medium', 'Is It Safe to Buy A Pet Prescription Online?', 'Online shopping makes getting the things you need easier, no matter where you are. But what about your pet\'s\n' +
//         '        medicine? Find out how to buy your pet\'s prescription online safely here...'));
//     content_array.push(new content('/media_166b0f10136e7ab0eaf653551a44109137571f930.png?width=750&amp;format=webply&amp;optimize=medium', 'The Complete Guide to Getting Rid of Fleas', 'Stop flea infestations in their tracks. With our handy guide to getting rid of fleas, you can ensure a\n' +
//         '        flea-free future for your pet and find the best way to stop fleas from returning.'));
//     content_array.push(new content('/media_1f3ad3ad9fba052ad5e3974c8472fac0036ce9363.png?width=750&amp;format=webply&amp;optimize=medium', 'How Often Should You Worm Your Pet?', 'Did you know some pets need worming more frequently than others? Our blog can help you find out if your pet is\n' +
//         '        getting the parasite protection they need.'));
//     content_array.push(new content('/media_1f37accc8be94256f63efa9ee0b3b3fda91bdc43e.png?width=750&amp;format=webply&amp;optimize=medium', 'How Do Flea Treatments Work?', 'o you know what you\'re looking for? Find out which flea treatment is best for your pet as we look at what\n' +
//         '        active ingredients to look out for and what they do.'));


    //testing code


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
}

export default async function decorate(block) {
  const content_array = await loadFragment();
  console.log(content_array);
  // if (Array.isArray(content_array)) {
  //   const petblogSection = document.querySelector('main .section.petblogs-container .petblogs-wrapper .petblogs');
  //   const unordered_list = document.createElement('ul');
  //   petblogSection.appendChild(unordered_list);
  //   content_array.forEach(item => {
  //     const list_element = document.createRange().createContextualFragment(`
  //     <li><div data-valign="middle" class="cards-card-image">
  //             <picture><source type="image/webp" srcset="${item.image}"><img loading="lazy" alt="" src="${item.image}"></picture>
  //           </div><div data-valign="middle" class="cards-card-body">
  //             <p><strong>${item.title}</strong></p>
  //             <p>${item.text}</p>
  //             <p class="button-container"><a href="/equipment" title="Read Blog" class="button">Read Blog</a></p>
  //           </div></li>`)
  //     const ul_element = document.querySelector('main .section.petblogs-container .petblogs-wrapper .petblogs ul');
  //     ul_element.appendChild(list_element);
  //   })
  //   console.log(petblogSection);
  }
}
