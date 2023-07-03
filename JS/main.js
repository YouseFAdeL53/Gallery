let myKey = "ul2PvAoTiipgZjaLPRiiAAgoYflyH8PbWdNk7m64b9NLajj6DFYoNcnh";
let theContent = document.querySelector(".content");
let lightBox = document.querySelector(".lightbox");
let closebtn = document.querySelector(".closebtn");
let theDownload = document.querySelector(".thedownload");
let myInput = document.querySelector(".form input");
let searchKey = null;
// Mybtn
let btnMore = document.querySelector(".btnMore");

let perPage = 15; // Image Appear At Page

let currentPage = 1; // One Page Only

// Lightbox

const showLightbox = (image, takeby) => {
  lightBox.classList.add("show");
  lightBox.querySelector("img").src = image;
  theDownload.setAttribute("data-id", image);
  lightBox.querySelector(".header h2").innerHTML = takeby;
  document.body.style.overflow = "hidden";
};

closebtn.addEventListener("click", () => {
  lightBox.classList.remove("show");
  document.body.style.overflow = "auto";
});

// Genrate

const genrateHtml = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    theContent.innerHTML += `
        <li class="item" onclick="showLightbox('${photos[i].src.large2x}', '${photos[i].photographer}')">
        <img src="${photos[i].src.large2x}" alt="">
        <div class="details">
          <i class="fa-solid fa-camera"></i>
          <h2>${photos[i].photographer}</h2>
          <i onclick="downloadImage('${photos[i].src.large2x}')" class="fa-solid fa-download"></i>
        </div>
      </li>
      `;
  }
};

// function GetPhotos

const getPhotos = (apiKey) => {
  btnMore.innerHTML = "Loading...";
  fetch(apiKey, {
    headers: {
      Authorization: myKey,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      genrateHtml(data.photos);
      btnMore.innerHTML = "Load More";
    });
};

const loadMorePhotos = () => {
  currentPage++;
  let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiUrl = searchKey
    ? `https://api.pexels.com/v1/search?query=${searchKey}&page=${currentPage}&per_page=${perPage}`
    : apiUrl;
  getPhotos(apiUrl);
};

const downloadImage = (apilink) => {
  fetch(apilink)
    .then((res) => res.blob())
    .then((blob) => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    });
};

const loadSearchImage = (e) => {
  if (e.key == "Enter") {
    currentPage = 1;
    theContent.innerHTML = "";
    searchKey = e.target.value;
    getPhotos(
      `https://api.pexels.com/v1/search?query=${searchKey}&page=${currentPage}&per_page=${perPage}`
    );
  }
};

getPhotos(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

// onClick
btnMore.addEventListener("click", loadMorePhotos);
theDownload.addEventListener("click", (e) =>
  downloadImage(e.target.dataset.id)
);
myInput.addEventListener("keyup", loadSearchImage);

let scroller = document.querySelector(".scroller");
let theTop = document.querySelector(".top")

window.addEventListener("scroll", () => {
  let theHeight =
    document.documentElement.offsetHeight -
    document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / theHeight) * 100}%`;

  if (window.scrollY >= 1000) {
    theTop.classList.add("show");
  } else {
    theTop.classList.remove("show");
  }
});

theTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

