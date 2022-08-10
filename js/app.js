const navbarBurger = (e) => {
    var menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
    e.classList.toggle('active');
};

const Buy = () => {
    var productParent = document.querySelector('.water-choose');
    var productChecked = productParent.querySelectorAll('input[type="radio"]');
    var addMinus = document.querySelector('#minus-water');
    var addPlus = document.querySelector('#plus-water');
    var displayer = document.querySelector('.displayer-input');
    var costDisplay = document.querySelector('.water-cost');
    var waterCost;
    productChecked.forEach(elem => {
        elem.addEventListener('change', () => {
            var displayerValue = parseInt(displayer.innerText);
            if (elem.checked) {
                waterCost = parseInt(elem.attributes['cost'].nodeValue);
                costDisplay.innerText = waterCost * displayerValue;
            };
        });
        if (elem.checked) {
            waterCost = parseInt(elem.attributes['cost'].nodeValue);
            costDisplay.innerText = waterCost;
        };
    });
    addMinus.onclick = () => {
        var displayerValue = parseInt(displayer.innerText);
        if (displayerValue != 1) {
            addMinus.classList.remove('disabled');
            minusedVal = displayerValue - 1
            displayer.innerText = minusedVal;
            costDisplay.innerText = waterCost * minusedVal;
        } else {
            addMinus.classList.add('disabled');
        }
    };
    addPlus.onclick = () => {
        var displayerValue = parseInt(displayer.innerText);
        var plusedVal = displayerValue + 1;
        displayer.innerText = plusedVal;
        costDisplay.innerText = waterCost * plusedVal;
        if (plusedVal != 1) {
            addMinus.classList.remove('disabled');
        } else {
            addMinus.classList.add('disabled');
        }
    }
};

Buy();

const Calculation = () => {
    var weight = document.getElementById('weight');
    var activeness = document.getElementById('activeness');
    var displayWeight = document.getElementById('weight-display');
    var displayActiveness = document.getElementById('active-display');
    var displayOverall = document.getElementById('overallResult');
    var bottle = document.getElementById('bottleBg');

    weight.addEventListener('input', (e) => {
        var weight_value = e.target.value;
        displayWeight.innerText = weight_value;
        bottle.classList.remove('animated');
    });
    weight.addEventListener('change', (e) => {
        var weight_value = parseInt(e.target.value);
        var activeness_value = activeness.value / 2 * 12;
        var overall_result = (weight_value + activeness_value) * 3;
        bottle.classList.remove('animated');
        if (overall_result > 100) {
            string_result = overall_result.toString();
            var litered_result = string_result[0] + ',' + string_result.slice(1, string_result.length - 1) + 'L';
            displayOverall.innerText = litered_result;
            bottle.style.height = `${12 * parseInt(string_result[0])}%`;
        } else {
            string_result = overall_result.toString();
            var litered_result = '0' + ',' + string_result.slice(0, string_result.length - 1) + 'L';
            displayOverall.innerText = litered_result;
            bottle.style.height = `${12}%`;
        };
    });
    activeness.addEventListener('input', (el) => {
        bottle.classList.remove('animated');
        displayActiveness.innerText = el.target.value;
    });
    activeness.addEventListener('change', (ell) => {
        var weight_value = parseInt(weight.value);
        var activeness_value = parseInt(ell.target.value) / 2 * 12;
        var overall_result = (weight_value + activeness_value) * 3;
        if (overall_result > 100) {
            string_result = overall_result.toString();
            var litered_result = string_result[0] + ',' + string_result.slice(1, string_result.length - 1) + 'L';
            displayOverall.innerText = litered_result;
            bottle.style.height = `${12 * parseInt(string_result[0])}%`;
        } else {
            string_result = overall_result.toString();
            var litered_result = '0' + ',' + string_result.slice(0, string_result.length - 1) + 'L';
            displayOverall.innerText = litered_result;
            bottle.style.height = `${12}%`;
        };
    });
};

Calculation();

const Slider = (mainId) => {
    function render() {
        var baseSlider = document.getElementById(mainId);
        var sliderWrapper = baseSlider.querySelector('.simple-wrapper');
        var childCount = sliderWrapper.childElementCount;
        var sliderChildren = sliderWrapper.children;
        var mainIndex = 0;
        var nextBtn = baseSlider.querySelector('.next-btn');
        var prevBtn = baseSlider.querySelector('.prev-btn');
        var preview = baseSlider.querySelector('.preview');
        if (preview) {
            var previewItem = preview.childNodes;
            var sortedPreviewItemList = [];
            previewItem.forEach((el) => {
                if (el.nodeName != '#text') {  // sorting if it doesn't contain extra spaces
                    sortedPreviewItemList.push(el);
                };
            });
            sortedPreviewItemList.forEach((e, index) => {
                e.onclick = () => {
                    sortedPreviewItemList.forEach((eloop) => {
                        eloop.classList.remove('active');
                    });
                    if (index < childCount) {
                        e.classList.add('active');
                        var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
                        sliderWrapper.style.transform = `translateX(-${ChildClientWidth * index}px)`;
                    };
                };
            });
        };
        nextBtn.onclick = () => {
            if (mainIndex != childCount - 1) {
                mainIndex += 1;
            } else {
                mainIndex = 0;
            };
            sortedPreviewItemList.forEach((all) => {
                all.classList.remove('active');
            });
            sortedPreviewItemList.forEach((exact, exactIndex) => {
                if (exactIndex == mainIndex) {
                    exact.classList.add('active');
                };
            });
            var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
            sliderWrapper.style.transform = `translateX(-${ChildClientWidth * mainIndex}px)`;
        };
        prevBtn.onclick = () => {
            if (mainIndex != 0) {
                mainIndex -= 1;
            } else {
                mainIndex = childCount - 1;
            };
            sortedPreviewItemList.forEach((all) => {
                all.classList.remove('active');
            });
            sortedPreviewItemList.forEach((exact, exactIndex) => {
                if (exactIndex == mainIndex) {
                    exact.classList.add('active');
                };
            });
            var ChildClientWidth = sliderChildren[mainIndex].clientWidth;
            sliderWrapper.style.transform = `translateX(-${ChildClientWidth * mainIndex}px)`;
        };
    };
    render();
};

Slider('catalogSlider');