const navbarBurger = (e) => {
    var menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
    e.classList.toggle('active');
};

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