const submitbtn = document.getElementById('submit-btn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp_real');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');
// set current date
const getCurrentDay = () => {
    var weekday = Array();
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    let currentTime = new Date();
    var day = weekday[currentTime.getDay()];
    return day;
}
const getCurrentDate = () => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();
    return date + " " + month;
}
day.innerText = getCurrentDay();
today_date.innerText = getCurrentDate();

submitbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = "Plz write the name before search";
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=56dccd6c263e87ce14023929f693444e&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            const tempMode = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;

            // temperature status
            if (tempMode == 'Clear') {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color:yellow"></i>';
            } else if (tempMode == 'Clouds') {
                temp_status.innerHTML = '<i class="fas fa-cloud"></i>';
            } else if (tempMode == 'Rain') {
                temp_status.innerHTML = '<i class="fas fa-cloud-rain"></i>';
            } else {
                temp_status.innerHTML = '<i class="fas fa-sun" style="color:yellow"></i>';
            }
            datahide.classList.remove('data_hide');
        } catch {
            city_name.innerText = 'Plz enter the city name properly';
        }
    }
});