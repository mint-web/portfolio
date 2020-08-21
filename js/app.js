//Aside navbar
const navLists = document.querySelectorAll('.nav > li');
const sections = document.querySelectorAll('.section');

//load from the json
getJsonFnc();

function navClickHandler(e) {
  const target = e.target;
  navLists.forEach(list => {
    list.classList.remove('active');
  });
  this.classList.add('active');

  //section
  let href = target.getAttribute('href').split('#');
  sections.forEach(section => {
    section.classList.remove('active');
    if (section.getAttribute('id') === href[1]) {
      section.classList.add('active');
    }

  })

}
navLists.forEach(list => {
  list.addEventListener('click', navClickHandler);
});

//Portflio
const itemWrap = document.querySelector('.item_wrap');
const lightBoxContainer = document.querySelector('.lightbox');
const lightBoxImage = document.querySelector('.lightbox_img');

function getJsonFnc() {
  return fetch('data/data.json')
    .then(res => res.json())
    .then(data => mapItemFnc(data))
}

function mapItemFnc(items) {
  itemWrap.innerHTML = items.map(item => addItemFnc(item)).join('');

  const portfolioItem = document.querySelectorAll('.portfolio_item');
  const btnClose = document.querySelector('.lightbox_close');
  let idx;
  let imgSrc;

  for (let i = 0; i < portfolioItem.length; i++) {
    portfolioItem[i].querySelector('.btn_detail').addEventListener('click', () => {
      idx = i;
      imgSrc = portfolioItem[idx].querySelector('img').getAttribute('src');
      lightBoxImage.src = imgSrc;
      lightBox();
    });
  }

  btnClose.addEventListener('click', () => {
    lightBoxContainer.classList.remove('open')
  })

}

function addItemFnc(item) {
  return `
  <div class="portfolio_item">
    <div class="img">
      <img src="${item.photo}" alt="">
    </div>
    <div class="info">
      <p>${item.title}</p>
      <a href="#" class="btn btn_detail">자세히보기</a>
    </div>
  </div>
  `;
}

//lightbox
function lightBox() {
  lightBoxContainer.classList.toggle('open')
}

// switch dark or light mode
const checkBox = document.querySelector('input[name=mode]');

function switchStyleFnc(sheet) {
  document.querySelector('#styleSheet').href = sheet;
}
checkBox.addEventListener('change', (e) => {
  if (e.target.checked) {
    switchStyleFnc('css/dark.css')
  } else {
    switchStyleFnc('css/style.css')
  }
});