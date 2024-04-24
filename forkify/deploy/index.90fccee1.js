function e(e){return e&&e.__esModule?e.default:e}var r=globalThis,t={},i={},s=r.parcelRequire3a11;null==s&&((s=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var s={id:e,exports:{}};return t[e]=s,r.call(s.exports,s,s.exports),s.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){i[e]=r},r.parcelRequire3a11=s),(0,s.register)("27Lyk",function(e,r){Object.defineProperty(e.exports,"register",{get:()=>t,set:e=>t=e,enumerable:!0,configurable:!0});var t,i=new Map;t=function(e,r){for(var t=0;t<r.length-1;t+=2)i.set(r[t],{baseUrl:e,path:r[t+1]})}}),s("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["ag6wN","index.90fccee1.js","e1psP","icons.c14567a0.svg"]'));const a="https://forkify-api.herokuapp.com/api/v2/recipes",n="aad88efe-822e-421d-a025-d4d0bf758f85";var c={};c=new URL("icons.c14567a0.svg",import.meta.url).toString();const o=async function(e,r){try{let t=r?fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}):fetch(e),i=await Promise.race([t,new Promise(function(e,r){setTimeout(function(){r(Error("Request took too long! Timeout after 10 seconds"))},1e4)})]),s=i.json();if(!i.ok)throw Error(`${s.message} ${i.status}`);return s}catch(e){throw e}},d=function(e,r){localStorage.setItem(e,JSON.stringify(r))},l=function(e){return JSON.parse(localStorage.getItem(e))},u=function(e){let r=Math.floor(e),t=Math.round(1e6*(e-r)),i=1e6,s=function(e,r){return r<1e-6?e:s(r,Math.floor(e%r))};s=s(t,1e6),t/=s,i/=s;let a="";return 0!==r&&(a+=r,0!==t&&(a+=" ")),0!==t&&(a+=`${t}/${i}`),a||""},p={recipe:{},search:{query:"",recipes:[],page:1,resultsPerPage:10},bookmarks:[]},h=function(e){return{id:e.id,title:e.title,publisher:e.publisher,sourceUrl:e.source_url,image:e.image_url,servings:e.servings,cookingTime:e.cooking_time,ingredients:e.ingredients,...e.key&&{key:e.key}}},g=async function(e){try{let{recipe:r}=(await o(`${a}/${e}?key=${n}`)).data;p.recipe=h(r),d("recipe",r),p.bookmarks.some(r=>r.id===e)?p.recipe.bookmarked=!0:p.recipe.bookmarked=!1}catch(e){throw e}},v=async function(e){try{let{recipes:r}=(await o(`${a}?search=${e}&key=${n}`)).data;p.search.query=e,p.search.page=1,p.search.recipes=r.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),d("query",p.search)}catch(e){throw e}},f=function(e=p.search.page){p.search.page=e;let r=(e-1)*p.search.resultsPerPage,t=e*p.search.resultsPerPage;return p.search.recipes.slice(r,t)},m=function(e=p.recipe.servings){p.recipe.ingredients.forEach(r=>{r.quantity=r.quantity*e/p.recipe.servings}),p.recipe.servings=e},_=function(e){p.bookmarks.push(e),e.id===p.recipe.id&&(p.recipe.bookmarked=!0),d("bookmarks",p.bookmarks)},k=function(e){let r=p.bookmarks.findIndex(r=>r.id===e);p.bookmarks.splice(r,1),p.recipe.id===e&&(p.recipe.bookmarked=!1),d("bookmarks",p.bookmarks)},b=async function(e){try{let r=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!=e[1]).map(e=>{let r=e[1].replaceAll(" ","").split(",");if(3!=r.length)throw Error("Wrong ingredient fomat, please use the correct format.");let[t,i,s]=r;return{quantity:+t??null,unit:i,description:s}}),t={title:e.title,publisher:e.publisher,source_url:e.source_url,image_url:e.image_url,servings:e.servings,cooking_time:e.cooking_time,ingredients:r},{recipe:i}=(await o(`${a}?key=${n}`,t)).data;p.recipe=h(i),_(p.recipe)}catch(e){throw e}};class y{data;render(e,r=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this.data=e;let t=this._generateMarkup();if(!r)return t;this.#e(),this.parentElement.insertAdjacentHTML("afterbegin",t)}update(e){this.data=e;let r=this._generateMarkup(),t=Array.from(document.createRange().createContextualFragment(r).querySelectorAll("*")),i=Array.from(this.parentElement.querySelectorAll("*"));t.forEach((e,r)=>{let t=i[r];e.isEqualNode(t)||e.firstChild?.nodeValue.trim()===""||(t.textContent=e.textContent),e.isEqualNode(t)||Array.from(e.attributes).forEach(e=>{t.setAttribute(e.name,e.value)})})}#e(){this.parentElement.innerHTML=""}renderSpinner(){let r=`<div class="spinner">
          <svg>
            <use href="${e(c)}#icon-loader"></use>
          </svg>
        </div>`;this.parentElement.innerHTML="",this.parentElement.insertAdjacentHTML("afterbegin",r)}renderMessage(r){let t=`
        <div class="message">
          <div>
            <svg>
              <use href="${e(c)}#icon-smile"></use>
            </svg>
          </div>
          <p>${r}</p>
        </div>`;this.#e,this.parentElement.innerHTML=t}renderError(r=this.errorMessage){let t=` 
        <div class="error">
          <div>
            <svg>
              <use href="${e(c)}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${r}</p>
        </div>`;this.#e(),this.parentElement.innerHTML=t}}class w extends y{errorMessage="No recipes found for your query. Please try again!";parentElement=document.querySelector(".recipe");addHandlerRender(e){["load","hashchange"].forEach(r=>window.addEventListener(r,e))}addHandlerBookmark(e){this.parentElement.addEventListener("click",r=>{r.target.closest(".btn--bookmark")&&e()})}addHandlerUpdateServings(e){this.parentElement.addEventListener("click",r=>{let t=r.target.closest(".btn--tiny");if(!t)return;let i=this.data.servings;e(t.classList.contains("btn--increase-servings")?i+1:i-1||1)})}_generateMarkup(){return`
    <div class="recipe">
        <figure class="recipe__fig">
          <img src="${this.data.image}" alt="recipe image" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(c)}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(c)}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data-people">${this.data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
                <svg>
                  <use href="${e(c)}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${e(c)}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this.data.key?"":"hidden"}">
             <svg class="nav__icon">
                <use href="${e(c)}#icon-user"></use>
              </svg>
          </div>

          <button class="btn--round btn--bookmark">
            <svg>
              <use href="${e(c)}#icon-bookmark${this.data.bookmarked?"-fill":""}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
           ${this.#r()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.data.publisher}</span>. Please
            check out the directions at their website
          </p>
          <a
            href="${this.data.sourceUrl}"
            class="btn--small recipe__btn"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${e(c)}#icon-arrow-right"></use>
            </svg>
          </a>
        </div> 
      </div>`}#r(){return`
          ${this.data.ingredients.reduce((r,t)=>r+`<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${e(c)}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${t.quantity?u(t.quantity):""}</div>
              <div class="recipe__description">
              <span class="recipe__unit">${t.unit}</span>
                ${t.description}
              </div>
            </li>`,"")}
        `}}var $=new w,E=new class extends y{_generateMarkup(){let r=location.hash.slice(1);return`
        <li class="preview">
            <a href="#${this.data.id}" class="preview__link ${r===this.data.id?"preview__link--active":""}">
            <figure class="preview__fig">
                <img src="${this.data.image}" alt="Test" /> 
            </figure>
            
            <div class="preview__data">
                <h4 class="preview__title">${this.data.title}</h4>
                <p class="preview__publisher">${this.data.publisher}</p>
                <div class="preview__user-generated ${this.data.key?"":"hidden"}">
                  <svg class="nav__icon">
                      <use href="${e(c)}#icon-user"></use>
                  </svg>
                </div>
            </div>
            </a>
        </li> 
        `}};class S extends y{parentElement=document.querySelector(".results");errorMessage="No recipes found for your query ;)";message="";_generateMarkup(){return this.data.reduce((e,r)=>e+E.render(r,!1),"")}}var M=new S;class q{#t=document.querySelector(".search");addHandlerSearch(e){this.#t.addEventListener("submit",r=>{r.preventDefault(),e()})}clearInput(){this.#t.querySelector(".search__field").value=""}getQuery(){return this.#t.querySelector(".search__field").value}}var H=new q;class L extends y{parentElement=document.querySelector(".pagination");addHandlerRender(e){this.parentElement.addEventListener("click",function(r){let t=r.target.closest(".btn--inline");t&&e(+t.dataset.goto)})}_generateMarkup(){let e=this.data.page,r=Math.ceil(this.data.recipes.length/this.data.resultsPerPage);return 1===e&&r>1?this.#i("right",e):e===r&&r>1?this.#i("left",e):e<r?this.#i("left",e).concat(this.#i("right",e)):""}#i(r,t){let i="left"===r?t-1:t+1;return`
        <button class="btn--inline pagination__btn--${"left"===r?"prev":"next"}" data-goto="${i}">
            <svg class="search__icon">
              <use href="${e(c)}#icon-arrow-${r}"></use>
            </svg>
            <span>Page ${i}</span>
        </button>`}}var x=new L;class R extends y{parentElement=document.querySelector(".bookmarks__list");errorMessage="No bookmarks yet find a nice recipe and bookmark it;)";message="";_generateMarkup(){return this.data.reduce((e,r)=>e+E.render(r,!1),"")}}var T=new R;class P extends y{parentElement=document.querySelector(".upload");#s=document.querySelector(".nav__btn--add-recipe");#a=document.querySelector(".add-recipe-window");#n=document.querySelector(".overlay");#c=document.querySelector(".btn--close-modal");#o=document.querySelector(".upload__btn");addHandlerRender(e){this.parentElement.addEventListener("submit",r=>{r.preventDefault(),e(Object.fromEntries([...new FormData(this.parentElement)]))})}constructor(){super(),this.addHandlerShowModal()}toggleWindow(){this.#a.classList.toggle("hidden"),this.#n.classList.toggle("hidden")}addHandlerShowModal(){this.#s.addEventListener("click",this.toggleWindow.bind(this)),this.#c.addEventListener("click",this.toggleWindow.bind(this))}}var A=new P;const N=async function(){try{let e=window.location.hash.slice(1)??"";if(!e)return;$.renderSpinner(),M.update(f()),T.update(p.bookmarks),await g(e),$.render(p.recipe)}catch(e){$.renderError()}},O=async function(){try{let e=H.getQuery();if(!e)return;M.renderSpinner(),await v(e),H.clearInput(),M.render(f()),x.render(p.search)}catch(e){M.renderError()}},U=async function(e){try{A.renderSpinner(),await b(e),A.renderMessage("Recipe was successfully uploaded"),$.render(p.recipe),T.render(p.bookmarks),window.history.pushState(null,"",`#${p.recipe.id}`),setTimeout(()=>{A.toggleWindow()},2500)}catch(e){A.renderError(e.message)}};$.addHandlerRender(N),$.addHandlerUpdateServings(function(e){m(e),$.update(p.recipe)}),$.addHandlerBookmark(function(){p.recipe.bookmarked?k(p.recipe.id):_(p.recipe),$.update(p.recipe),T.render(p.bookmarks)}),H.addHandlerSearch(O),x.addHandlerRender(function(e){M.render(f(e)),x.render(p.search)}),A.addHandlerRender(U),window.addEventListener("load",function(){let e=l("bookmarks"),r=l("query");l("recipe")||$.renderMessage("Start by searching for a recipe or an ingredient. Have fun!"),r||M.renderMessage("Search results will be displayed here. :)"),e?T.render(e):T.renderMessage("No bookmarks yet. Find a nice recipe and bookmark it :)")});
//# sourceMappingURL=index.90fccee1.js.map
