//The setting box

//The gear icon
document.querySelector(".icon i").onclick = () => {
  document.querySelector(".settings-box").classList.toggle("opened");
  document.querySelector(".icon i").classList.toggle("fa-spin");
};

//The colors
let colorsArray = Array.from(
  document.querySelectorAll(".colors-list .colors li")
);

colorsArray.forEach((li) => {
  li.addEventListener("click", (e) => {
    //Accessing the root and changing the value of the var main-color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("main color", e.target.dataset.color);

    colorsArray.forEach((li) => {
      li.classList.remove("active");
    });
    li.classList.add("active");
    window.localStorage.setItem("indexOf_mainColor", colorsArray.indexOf(li));
  });
});

//Randomly changing the background image of the landing
let landing = document.querySelector(".landing");
let arr = ["0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

let imageSpan = Array.from(document.querySelectorAll(".choose-image span"));

function randomizeImage() {
  if (randomBackgroundStatus === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = arr.indexOf(
        arr[Math.floor(Math.random() * arr.length)]
      );
      landing.style.backgroundImage = `url("../imgs/${randomNumber}.jpg")`;
      imageSpan.forEach((el) => {
        el.classList.remove("active");
      });
      imageSpan[randomNumber].classList.add("active");
    }, 10000);
  }
}

let randomBackgroundStatus = true;
let backgroundInterval;

if (localStorage.getItem("random_background") !== null) {
  document.querySelectorAll(".status span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localStorage.getItem("random_background") === "true") {
    randomBackgroundStatus = true;
    document.querySelector(".status .yes").classList.add("active");
  } else {
    randomBackgroundStatus = false;
    document.querySelector(".status .no").classList.add("active");
  }
}

randomizeImage();

let spans = Array.from(
  document.querySelectorAll(".random-background .status span")
);

spans.forEach((e) => {
  e.onclick = () => {
    spans.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.classList.add("active");

    if (e.innerHTML === "yes") {
      document.querySelector(".reset-options").classList.remove("active");
      localStorage.setItem("reset Button", "Not active");
      randomBackgroundStatus = true;
      randomizeImage();
      localStorage.setItem("random_background", true);
      document
        .querySelector(".random-background .choose-image")
        .classList.remove("active");
    } else {
      document.querySelector(".reset-options").classList.add("active");
      localStorage.setItem("reset Button", "active");
      randomBackgroundStatus = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("random_background", false);
      document
        .querySelector(".random-background .choose-image")
        .classList.add("active");
    }
  };
});

imageSpan.forEach((ele) => {
  ele.onclick = () => {
    imageSpan.forEach((e) => {
      e.classList.remove("active");
    });
    ele.classList.add("active");
    landing.style.backgroundImage = `url("../imgs/${
      Number(ele.dataset.number) - 1
    }.jpg")`;
    localStorage.setItem("Image_Number", Number(ele.dataset.number) - 1);
  };
});

if (spans[1].classList.contains("active")) {
  document
    .querySelector(".random-background .choose-image")
    .classList.add("active");
}

//Our Skills Section
let ourSkills = document.querySelector(".skills");

//Gallery section
let imagesArray = Array.from(document.querySelectorAll(".gallery .images img"));

imagesArray.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create the popup
    let popup = document.createElement("div");
    popup.className = "popup";

    //append the popup to the body
    document.body.appendChild(popup);

    //create the overlay
    let overlay = document.createElement("div");
    overlay.className = "the-overlay";

    //append the overlay to the body
    document.body.appendChild(overlay);

    //the alt
    if (img.alt !== null) {
      //create the alt
      let alt = document.createElement("div");
      alt.className = "alt";
      alt.appendChild(document.createTextNode(img.alt));

      //append the alt to the popup
      popup.appendChild(alt);
    }

    //create the image
    let image = document.createElement("img");
    image.className = "the-image";
    image.src = img.src;

    //append the image inside the popup
    popup.appendChild(image);

    //create the close button
    let close = document.createElement("div");
    close.appendChild(document.createTextNode("X"));
    close.className = "close-button";

    //append the close button to the popup
    popup.appendChild(close);

    //the close button function
    close.onclick = () => {
      popup.remove();
      overlay.remove();
    };
    document.onkeyup = (e) => {
      if (e.key === "Escape") {
        close.click();
      }
    };
  });
});

//The fixed bullets on the right side
let about = document.querySelector(".about");
let ourskills = document.querySelector(".skills");
let ourGallery = document.querySelector(".gallery");
let timeline = document.querySelector(".timeline");
let features = document.querySelector(".features");
let testimonials = document.querySelector(".testimonials");

let bullets = Array.from(document.querySelectorAll(".bullets .link span"));
let links = Array.from(document.querySelectorAll(".landing .list li"));

let array = [about, ourskills, ourGallery, timeline, features, testimonials];

let scrollto = function (array, links) {
  links.forEach((span, index) => {
    span.addEventListener("click", (e) => {
      e.preventDefault();
      array[index].scrollIntoView({ behavior: "smooth" });
    });
  });
};

//array[index].scrollIntoView({ behavior: "smooth" })

scrollto(array, bullets);
scrollto(array, links);

//the button to scroll to top
let scrollUpButton = document.querySelector(".button-up");

window.onscroll = () => {
  //Height from the top to our skills
  let skillsOffset = ourSkills.offsetTop;

  //Height of our skills element
  let skillsOuterHeight = ourSkills.offsetHeight;

  //The scrolled amount from top 0
  let windowScrollTop = document.documentElement.scrollTop;

  //window height accoeding to zoom percentage
  let windowHeight = window.innerHeight;

  let percentages = Array.from(
    document.querySelectorAll(".skills .percentage")
  );

  if (windowScrollTop >= skillsOffset + skillsOuterHeight - windowHeight) {
    percentages.forEach((ele) => {
      ele.style.width = ele.dataset.percentage;
    });
  } else {
    percentages.forEach((ele) => {
      ele.style.width = 0;
    });
  }

  if (document.documentElement.scrollTop > 430) {
    scrollUpButton.classList.add("active");
  } else {
    scrollUpButton.classList.remove("active");
  }
};

scrollUpButton.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

//the show bullets
let yesAndNo = Array.from(document.querySelectorAll(".show-bullets span"));
let bulletsDiv = document.querySelector(".bullets");

yesAndNo.forEach((span) => {
  span.onclick = () => {
    yesAndNo.forEach((e) => {
      e.classList.remove("active");
    });
    span.classList.add("active");

    if (span.dataset.agree === "yes") {
      bulletsDiv.classList.add("active");
      localStorage.setItem("bullets", "Yes");
    } else {
      bulletsDiv.classList.remove("active");
      localStorage.setItem("bullets", "No");
    }
  };
});

//the reset options button
let resetButton = document.querySelector(".reset-options");

resetButton.onclick = () => {
  localStorage.clear();
  window.location.reload();
  resetButton.classList.remove("active");
};

window.onload = () => {
  imageSpan.forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localStorage.getItem("Image_Number")) {
    imageSpan[localStorage.getItem("Image_Number")].classList.add("active");
    landing.style.backgroundImage = `url("../imgs/${localStorage.getItem(
      "Image_Number"
    )}.jpg")`;
  } else {
    imageSpan[0].classList.add("active");
  }
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("main color")
  );
  colorsArray.forEach((el) => {
    el.classList.remove("active");
  });
  if (localStorage.getItem("indexOf_mainColor")) {
    colorsArray[localStorage.getItem("indexOf_mainColor")].classList.add(
      "active"
    );
  } else {
    colorsArray[0].classList.add("active");
  }
  if (localStorage.getItem("bullets")) {
    if (localStorage.getItem("bullets") === "Yes") {
      yesAndNo[0].click();
    } else {
      yesAndNo[1].click();
    }
  }
  if (localStorage.getItem("reset Button") === "active") {
    resetButton.classList.add("active");
  } else {
    resetButton.classList.remove("active");
  }
};

//THE TOGGLE BUTTON

let togglebtn = document.querySelector(".list-urls button");
let toggleLinks = document.querySelector(".list-urls .list");

togglebtn.onclick = (e) => {
  togglebtn.classList.toggle("opened");
  e.stopPropagation();
  toggleLinks.classList.toggle("active");
};

toggleLinks.onclick = (e) => {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== togglebtn || e.target !== toggleLinks) {
    if (toggleLinks.classList.contains("active")) {
      toggleLinks.classList.remove("active");
      togglebtn.classList.remove("opened");
    }
  }
});
