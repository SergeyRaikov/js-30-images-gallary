const grid = document.querySelector('.grid');
const search = document.querySelector('.search');
const searchIcon = document.querySelector('.search__icon');
const clearSerhcIcon = document.querySelector('.clear-search');
const body = document.body;
const footer = document.querySelector('footer');
const modeButton = document.querySelector('.theme-mode-btn');
let isLigthMode = true;
const darkModeInnerHTML = '<i class="fa-solid fa-moon"></i>';
const lightModeInnerHTML = '<i class="fa-solid fa-sun yellow"></i>';
const loaderContainer = document.querySelector('.spiner-container');

const showLoaderSpiner = () => {
  loaderContainer.style.display = 'none';
};
window.addEventListener('load', showLoaderSpiner);

const hideSearchIcon = () => {
  searchIcon.classList.add('hidden');
};
const showSearchIcon = () => {
  searchIcon.classList.remove('hidden');
};
const showClearIcon = () => {
  clearSerhcIcon.classList.add('visible');
};
const hideClearIcon = () => {
  clearSerhcIcon.classList.remove('visible');
};

const clearSearchForm = () => {
  search.value = '';
};

const clearGrid = () => {
  grid.innerHTML = '';
};

showData = (data) => {
  clearGrid();
  if (data.total !== 0) {
    console.log(data.results)
    const imageNodes = [];
    for (let i = 0; i < data.results.length; i++) {
      imageNodes[i] = document.createElement('div');
      imageNodes[i].innerHTML =
        ` <a download ="${data.results[i].urls.full}" ><i class="fa-solid fa-download"></i></a>`;
      imageNodes[i].className = 'grid__img';
      imageNodes[i].style.backgroundImage =
        'url(' + data.results[i].urls.small + ')';
      imageNodes[i].addEventListener('click', () => {
        window.open(data.results[i].links.download, '_blank');
      });
      grid.appendChild(imageNodes[i]);
    }
  } else {
    console.log('Images not found');
    const fallMessage = document.createElement('div');
    fallMessage.textContent = 'Images not found';
    grid.appendChild(fallMessage);
  }
};
async function getData() {
  let url;
  if (search.value !== '') {
    url = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&tag_mode=all&extras=url_m&client_id=-CevN3rQ1iZfiXge0_fD4-gKZ1jjOrNGpMxRKOyZUxA`;
  } else {
    url = `https://api.unsplash.com/search/photos?query=random&per_page=9&tag_mode=all&extras=url_m&client_id=-CevN3rQ1iZfiXge0_fD4-gKZ1jjOrNGpMxRKOyZUxA`;
  }
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
}

window.addEventListener('load', getData);

search.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    clearGrid();
    getData();
    hideSearchIcon();
    showClearIcon();
  }
});

clearSerhcIcon.addEventListener('click', () => {
  clearSearchForm();
  hideClearIcon();
  showSearchIcon();
});

const addDarkMode = () => {
  modeButton.innerHTML = darkModeInnerHTML;
  isLigthMode = false;
  body.classList.add('dark-mode');
  footer.classList.add('dark-mode_footer');
};

const removeDarkMode = () => {
  modeButton.innerHTML = lightModeInnerHTML;
  isLigthMode = true;
  body.classList.remove('dark-mode');
  footer.classList.remove('dark-mode_footer');
};

const switchMode = () => {
  if (isLigthMode) addDarkMode();
  else removeDarkMode();
};

modeButton.addEventListener('click', switchMode);


