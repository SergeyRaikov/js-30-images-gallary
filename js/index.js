const grid = document.querySelector('.grid');
const search = document.querySelector('.search');

const clearGrid = () => {
  grid.innerHTML = '';
};

showData = (data) => {
  clearGrid();
  const imageNodes = [];
  for (let i = 0; i < data.results.length; i++) {
    imageNodes[i] = document.createElement('div');
    imageNodes[i].className = 'grid__img';
    imageNodes[i].style.backgroundImage =
      'url(' + data.results[i].urls.raw + ')';
    imageNodes[i].addEventListener('click', () => {
      window.open(data.results[i].links.download, '_blank');
    });
    grid.appendChild(imageNodes[i]);
  }
};
async function getData() {
  let url;
  if (search.value !== '') {
    url = `https://api.unsplash.com/search/photos?query=${search.value}&per_page=30&tag_mode=all&client_id=-CevN3rQ1iZfiXge0_fD4-gKZ1jjOrNGpMxRKOyZUxA`;
  } else {
    url = `https://api.unsplash.com/search/photos?query=random&per_page=9&tag_mode=all&client_id=-CevN3rQ1iZfiXge0_fD4-gKZ1jjOrNGpMxRKOyZUxA`;
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
  }
});
