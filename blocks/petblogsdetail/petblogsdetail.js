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
async function getCategoryListData(){
  {
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
      // body: graphql,
    };

    const final_result= await fetch(AEM_HOST + queryURL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          return (JSON.parse(result)).data.petBlogsList.items;
        })
        .catch((error) => console.error(error));
    // testing code
    console.log(final_result);
    class content {
      constructor(category,subcategory) {
        this.category = category;
        this.subcategory = subcategory;
      }
    }

    const content_array = [];
    final_result.forEach((item) => {
      if(item.imagepath=== null) {
        const temp_content = new content;
        temp_content.subcategory = item.title;
        temp_content.category = item._path;
        content_array.push(temp_content);
      }
    })
    return content_array;

  }
}
async function loadFragment() {
  {
    /* Hardcoded endpoint */
    const currentUrl = new URL(window.location.href);
    const queryParams = new URLSearchParams(currentUrl.search);
    const AEM_HOST = 'https://publish-p123152-e1381861.adobeaemcloud.com/graphql/execute.json';
    const queryURL = `/pdol-site/blogs-by-slug;slug=${queryParams.get('slug')}`;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const graphql = JSON.stringify({
      query: 'query ($slug: String!) {\n  petBlogsList(filter: {slug: {_expressions: [{value: $slug}]}}) {\n    items {\n      _path\n      title\n      content {\n        html\n      }\n      slug\n    }\n  }\n}\n',
      variables: { slug: queryParams.get('slug') },
    });
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // body: graphql,
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
  const categoryList= await getCategoryListData();
  const searchParam= new URL(window.location.href);
  const queryParam = new URLSearchParams(searchParam.search);
  console.log(categoryList);
  if (fragment) {
    const fragmentSection = document.querySelector('.petblogsdetail.block');
    const categorySection = document.querySelector('.category-listing.block');
    const list_element = document.createRange().createContextualFragment(`
    <div data-amblog-js="accordion" class="amblog-widget-container -categories" role="tablist">
            <h3 class="amblog-title -active" data-amblog-js="heading" data-collapsible="true" role="tab" aria-selected="true" aria-expanded="true" tabindex="0">
                Categories            </h3>
            <div class="amblog-list" data-amblog-js="content" role="tabpanel" aria-hidden="false" style="">
                <ul class="amblog-categories -level1">
                    
                    <li class="amblog-category  amblog-category-1">
            <a class="amblog-link" title="Dog" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Dog                <span class="amblog-category-count">(88)</span>
            </a>

                            <ul class="amblog-categories -level2">
                    
                    <li class="amblog-category  amblog-category-16">
            <a class="amblog-link" title="Dog Nutrition" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Dog Nutrition                <span class="amblog-category-count">(12)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-22">
            <a class="amblog-link" title="Dog Health" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Dog Health                <span class="amblog-category-count">(28)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-25">
            <a class="amblog-link" title="Dog Behaviour " href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')} ">
                Dog Behaviour                 <span class="amblog-category-count">(10)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-28">
            <a class="amblog-link" title="Dog Well Being" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Dog Well Being                <span class="amblog-category-count">(35)</span>
            </a>

                    </li>
                    </ul>
                    </li>
                    <li class="amblog-category  amblog-category-4">
            <a class="amblog-link" title="Cat" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Cat                <span class="amblog-category-count">(59)</span>
            </a>

                            <ul class="amblog-categories -level2">
                    
                    <li class="amblog-category  amblog-category-19">
            <a class="amblog-link" title="Cat Nutrition" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Cat Nutrition                <span class="amblog-category-count">(4)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-31">
            <a class="amblog-link" title="Cat Health" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Cat Health                <span class="amblog-category-count">(22)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-34">
            <a class="amblog-link" title="Cat Well Being" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Cat Well Being                <span class="amblog-category-count">(22)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-37">
            <a class="amblog-link" title="Cat Behaviour" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Cat Behaviour                <span class="amblog-category-count">(6)</span>
            </a>

                    </li>
                    </ul>
                    </li>
                    <li class="amblog-category  amblog-category-7">
            <a class="amblog-link" title="Horse" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Horse                <span class="amblog-category-count">(12)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-13">
            <a class="amblog-link" title="Bird" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Bird                <span class="amblog-category-count">(5)</span>
            </a>

                    </li>
                    <li class="amblog-category  amblog-category-10">
            <a class="amblog-link" title="Small Animal" href="https://main--pdol-demo--lakshya-aggarwal.hlx.live/blogs/petblogsdetail?slug=${queryParam.get('slug')}">
                Small Animal                <span class="amblog-category-count">(11)</span>
            </a>

                    </li>
                    </ul>
            </div>
        </div>
    `)
    categorySection.appendChild(list_element);
    console.log(fragmentSection);
    if (fragmentSection) {
      fragmentSection.innerHTML = fragment;
    }
  }
}
