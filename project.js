const htmlNoData = document.getElementById("noData");
const sortByView = document.getElementById("btn-1");
let videos;

sortByView.addEventListener("click", () => {
  console.log(videos);
  const newArray = videos.sort((a, b) => {
    const viewsA = parseFloat(a.others.views);
    const viewsB = parseFloat(b.others.views);
    return viewsB - viewsA;
  });
  loadData(newArray);
});

const loadData = async (data) => {
  //console.log(data);
  const bodyData = document.getElementById("bod");
  bodyData.innerHTML = "";
  const firstPage = document.getElementById("first_page");
  firstPage.style.display = "none";
  if (data.length == 0) {
    //console.log("No data");

    htmlNoData.innerHTML = "";
    const nData = document.createElement("div");
    nData.classList.add("cNoData");
    nData.innerHTML = `<img src="./Icon.png" alt="" />
    <h1>Oops!! Sorry, There is no content here</h1>`;
    htmlNoData.appendChild(nData);
  } else {
    htmlNoData.innerHTML = "";
    data.forEach((d) => {
      //   //console.log(d);
      const hours = parseInt(d.others.posted_date / 3600);
      const minutes = (d.others.posted_date / 3600 - hours) * 60;
      let time =
        hours +
        " " +
        "hrs" +
        " " +
        parseInt(minutes) +
        " " +
        "min" +
        " " +
        "ago";
      //console.log(d.authors[0].verified);
      const card = document.createElement("div");
      card.classList.add("result");
      if (d.authors[0].verified) {
        card.innerHTML = `
    <div class="card">
    <div class="imaged">
        <img  src="${d.thumbnail}" width="100%" height="100%" alt="" />
        <div class="views">${hours !== 0 && minutes !== 0 ? time : ""} </div>
    </div>
    <div class="afterImaged">
      <img class="aimg" src="${
        d.authors[0].profile_picture
      }" width="30rem" height="30rem"  alt="" />
      <div>
        <div class="title">${d.title}</div>
        <div class="author">${
          d.authors[0].profile_name
        } <img class="verify" src="./checklist_10629607.png" alt=""></div>
        <div class="views">${d.others.views} views</div>
      </div>
    </div>
  </div>`;
      } else {
        card.innerHTML = `
    <div class="card">
    <div class="imaged">
        <img  src="${d.thumbnail}" width="100%" height="100%" alt="" />
        <div class="views">${hours !== 0 && minutes !== 0 ? time : ""} </div>
    </div>
    <div class="afterImaged">
      <img class="aimg" src="${
        d.authors[0].profile_picture
      }" width="30rem" height="30rem"  alt="" />
      <div>
        <div class="title">${d.title}</div>
        <div class="author">${d.authors[0].profile_name} </div>
        <div class="views">${d.others.views} views</div>
      </div>
    </div>
  </div>`;
      }
      bodyData.appendChild(card);
    });
  }
};

const loadVideos = async (id) => {
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  loadData(data.data);
  videos = data.data;
};

const displayCategory = async (datas) => {
  const categories = document.getElementById("top");
  datas.forEach((data) => {
    const button = document.createElement("button");
    button.classList = " btnTop";
    button.addEventListener("click", function () {
      const allBtn = document.querySelectorAll(".btnTop");
      allBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      loadVideos(data.category_id);
    });
    button.innerText = data.category;
    categories.appendChild(button);
  });
};

const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data);
};

loadCategories();
loadVideos(1000);
