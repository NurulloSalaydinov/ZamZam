// const navbarAnimation = () => {
//   var prevScrollpos = window.pageYOffset;
//   window.onscroll = function () {
//     var currentScrollPos = window.pageYOffset;
//     if (prevScrollpos > currentScrollPos) {
//       document.querySelector("nav").classList.add("fixed-visible");
//     } else {
//       document.querySelector("nav").classList.remove("fixed-visible");
//     }
//     prevScrollpos = currentScrollPos;
//     if (currentScrollPos > 300) {
//       document.querySelector("nav").classList.add("fixed-unvisible");
//     } else {
//       document.querySelector("nav").classList.remove("fixed-unvisible");
//       document.querySelector("nav").classList.remove("fixed-visible");
//     }
//   };
// };

// navbarAnimation();
document.querySelectorAll('input').forEach(e => {
  e.onchange = () => {
    e.value.replace(/[^a-zA-Z0-9]/g, '');
  }
});

const navbarBurger = (e) => {
  var menu = document.querySelector(".navbar-menu");
  menu.classList.toggle("active");
  e.classList.toggle("active");
};

const Buy = () => {
  var productParent = document.querySelector(".water-choose");
  var productChecked = productParent.querySelectorAll('input[type="radio"]');
  var addMinus = document.querySelector("#minus-water");
  var addPlus = document.querySelector("#plus-water");
  var displayer = document.querySelector(".displayer-input");
  var costDisplay = document.querySelector(".water-cost");
  var orderButtons = document.querySelectorAll(".order-modal-open");
  var waterCost;
  productChecked.forEach((elem) => {
    elem.addEventListener("change", () => {
      var displayerValue = parseInt(displayer.innerText);
      if (elem.checked) {
        waterCost = parseInt(elem.attributes["cost"].nodeValue);
        costDisplay.innerText = waterCost * displayerValue;
      }
    });
    if (elem.checked) {
      waterCost = parseInt(elem.attributes["cost"].nodeValue);
      costDisplay.innerText = waterCost;
    }
  });
  addMinus.onclick = () => {
    var displayerValue = parseInt(displayer.innerText);
    if (displayerValue != 1) {
      addMinus.classList.remove("disabled");
      minusedVal = displayerValue - 1;
      displayer.innerText = minusedVal;
      costDisplay.innerText = waterCost * minusedVal;
    } else {
      addMinus.classList.add("disabled");
    }
  };
  addPlus.onclick = () => {
    var displayerValue = parseInt(displayer.innerText);
    var plusedVal = displayerValue + 1;
    displayer.innerText = plusedVal;
    costDisplay.innerText = waterCost * plusedVal;
    if (plusedVal != 1) {
      addMinus.classList.remove("disabled");
    } else {
      addMinus.classList.add("disabled");
    }
  };
  orderButtons.forEach((btn) => {
    btn.onclick = () => {
      var countValue = parseInt(displayer.innerText);
      var costValue = costDisplay.innerText;
      var checkedLitrSize;
      productChecked.forEach((isChecked) => {
        if (isChecked.checked) {
          checkedLitrSize = isChecked.attributes["litr-size"].nodeValue;
        }
      });
      var overallModalResult = `${checkedLitrSize} x ${countValue} qadoq`;
      document.querySelector(".modal-count").innerText = overallModalResult;
      document.querySelector("#cost-modal-input").value = costValue;
      document.querySelector("#count-modal-input").value = countValue;
      document.querySelector("#order-size-modal-input").value = checkedLitrSize;
      document.querySelector(".modal").classList.add("active");
    };
  });
};

Buy();

const Calculation = () => {
  var weight = document.getElementById("weight");
  var activeness = document.getElementById("activeness");
  var displayWeight = document.getElementById("weight-display");
  var displayActiveness = document.getElementById("active-display");
  var displayOverall = document.getElementById("overallResult");
  var bottle = document.getElementById("bottleBg");

  weight.addEventListener("input", (e) => {
    var weight_value = e.target.value;
    displayWeight.innerText = weight_value;
    bottle.classList.remove("animated");
  });
  weight.addEventListener("change", (e) => {
    var weight_value = parseInt(e.target.value);
    var activeness_value = (activeness.value / 2) * 12;
    var overall_result = (weight_value + activeness_value) * 3;
    bottle.classList.remove("animated");
    if (overall_result > 100) {
      string_result = overall_result.toString();
      var litered_result =
        string_result[0] +
        "," +
        string_result.slice(1, string_result.length - 1) +
        "L";
      displayOverall.innerText = litered_result;
      bottle.style.height = `${12 * parseInt(string_result[0])}%`;
    } else {
      string_result = overall_result.toString();
      var litered_result =
        "0" + "," + string_result.slice(0, string_result.length - 1) + "L";
      displayOverall.innerText = litered_result;
      bottle.style.height = `${12}%`;
    }
  });
  activeness.addEventListener("input", (el) => {
    bottle.classList.remove("animated");
    displayActiveness.innerText = el.target.value;
  });
  activeness.addEventListener("change", (ell) => {
    var weight_value = parseInt(weight.value);
    var activeness_value = (parseInt(ell.target.value) / 2) * 12;
    var overall_result = (weight_value + activeness_value) * 3;
    if (overall_result > 100) {
      string_result = overall_result.toString();
      var litered_result =
        string_result[0] +
        "," +
        string_result.slice(1, string_result.length - 1) +
        "L";
      displayOverall.innerText = litered_result;
      bottle.style.height = `${12 * parseInt(string_result[0])}%`;
    } else {
      string_result = overall_result.toString();
      var litered_result =
        "0" + "," + string_result.slice(0, string_result.length - 1) + "L";
      displayOverall.innerText = litered_result;
      bottle.style.height = `${12}%`;
    }
  });
};

Calculation();

const Slider = (mainId) => {
  function render() {
    var baseSlider = document.getElementById(mainId);
    var sliderWrapper = baseSlider.querySelector(".simple-wrapper");
    var childCount = sliderWrapper.childElementCount;
    var sliderChildren = sliderWrapper.children;
    var mainIndex = 0;
    var nextBtn = baseSlider.querySelector(".next-btn");
    var prevBtn = baseSlider.querySelector(".prev-btn");
    var preview = baseSlider.querySelector(".preview");
    if (preview) {
      var previewItem = preview.childNodes;
      var sortedPreviewItemList = [];
      previewItem.forEach((el) => {
        if (el.nodeName != "#text") {
          // sorting if it doesn't contain extra spaces
          sortedPreviewItemList.push(el);
        }
      });
      sortedPreviewItemList.forEach((e, index) => {
        e.onclick = () => {
          sortedPreviewItemList.forEach((eloop) => {
            eloop.classList.remove("active");
          });
          if (index < childCount) {
            e.classList.add("active");
            var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
            sliderWrapper.style.transform = `translateX(-${
              ChildClientWidth * index
            }px)`;
          }
        };
      });
    }
    nextBtn.onclick = () => {
      if (mainIndex != childCount - 1) {
        mainIndex += 1;
      } else {
        mainIndex = 0;
      }
      sortedPreviewItemList.forEach((all) => {
        all.classList.remove("active");
      });
      sortedPreviewItemList.forEach((exact, exactIndex) => {
        if (exactIndex == mainIndex) {
          exact.classList.add("active");
        }
      });
      var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
      sliderWrapper.style.transform = `translateX(-${
        ChildClientWidth * mainIndex
      }px)`;
    };
    prevBtn.onclick = () => {
      if (mainIndex != 0) {
        mainIndex -= 1;
      } else {
        mainIndex = childCount - 1;
      }
      sortedPreviewItemList.forEach((all) => {
        all.classList.remove("active");
      });
      sortedPreviewItemList.forEach((exact, exactIndex) => {
        if (exactIndex == mainIndex) {
          exact.classList.add("active");
        }
      });
      var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
      sliderWrapper.style.transform = `translateX(-${
        ChildClientWidth * mainIndex
      }px)`;
    };
  }
  render();
};

const closeModal = () => {
  document.querySelector(".modal").classList.remove("active");
};

Slider("catalogSlider");

const SweetAlert = (message, info='info') => {
  let alert = document.createElement('div');
  alert.classList.add('alert');
  alert.classList.add(info);
  alert.innerHTML = `
  <div class="close-sweet">x</div> 
  <h5>${message}</h5>
  `
  document.body.appendChild(alert);
  setTimeout(() => {
    document.querySelectorAll('.alert').forEach(alert => {
      alert.classList.add('alert-show');
    });
  }, 100)
  setTimeout(() => {
    document.body.removeChild(alert);
  }, 4000)
  document.querySelector('.close-sweet').onclick = () => {
    document.body.removeChild(alert);
  }
}

const sendToContact = (formContact) => {
  var kvpairs = {};
  var form = formContact;
  for (var i = 0; i < form.elements.length; i++) {
    var e = form.elements[i];
    if (encodeURIComponent(e.name) != '' && encodeURIComponent(e.value) != '') {
      kvpairs[encodeURIComponent(e.name)] = encodeURIComponent(e.value.replace(/[^a-zA-Z0-9]/g, '_'))
    }
  }
  var jsonData = JSON.stringify(kvpairs);
  console.log(jsonData);
  fetch("/new-contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data['success'] == 200) {
        SweetAlert('Qabul qilindi !', 'info');
        document.querySelectorAll('input').forEach(input => {
          input.value = ''
        });
        document.querySelectorAll('textarea').forEach(textarea => {
          textarea.value = ''
        });
      } else {
        SweetAlert('Xatolik ketdi boshqattan urinib korin !', 'warning');
      }
    })
    .catch((error) => {
      SweetAlert('Xatolik ketdi boshqattan urinib korin !', 'warning');
    });
}

const sendFormData = (formEl) => {
  var kvpairs = {};
  var form = formEl;
  for (var i = 0; i < form.elements.length; i++) {
    var e = form.elements[i];
    if (encodeURIComponent(e.name) != '' && encodeURIComponent(e.value) != '') {
      kvpairs[encodeURIComponent(e.name)] = encodeURIComponent(e.value.replace(/[^a-zA-Z0-9]/g, '_'))
    }
  }
  var jsonData = JSON.stringify(kvpairs);
  fetch("/new-order/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('.modal').classList.remove('active');
      if (data['success'] == 200) {
        SweetAlert('Qabul qilindi !', 'info');
        document.querySelectorAll('input').forEach(input => {
          input.value = ''
        });
        document.querySelectorAll('textarea').forEach(textarea => {
          textarea.value = ''
        });
      } else {
        SweetAlert('Xatolik ketdi boshqattan urinib korin !', 'warning');
      }
    })
    .catch((error) => {
      SweetAlert('Xatolik ketdi boshqattan urinib korin !', 'warning');
    });
};
