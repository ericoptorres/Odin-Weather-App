
function requestInfo(location){
    return fetch(`http://api.weatherapi.com/v1/current.json?key=6915f6a4a5c5410c813184808232605&q=${location}`, {mode: 'cors'})
    .then(res => res.json())
    .then(data => filterData(data))
    .catch(err => alert(err))
}

const filterData = (data) => {
    console.log(data)
    const filtered =  {
        name: data.location.name,
        country: data.location.country,
        tempCelsius: data.current.temp_c,
        tempFarenheit: data.current.temp_f,
        humidity: data.current.humidity,
        weather: data.current.condition.icon
    }
    return filtered
}

const city = document.getElementById('city')
const infoDiv = document.querySelector('.refresh')

const submitBtn = document.querySelector('button')
submitBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    infoDiv.innerHTML = ''
    display()
})


const createContainer = async (city) => {
    const div = document.createElement('div')
    const para = document.createElement('p')
    const span = document.createElement('span')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const myData = await requestInfo(city)

    para.textContent = `${myData.name}, ${myData.country}:`
    span.textContent = myData.tempCelsius + ' ºC'
    img.src = "https://" + myData.weather
    h2.textContent = 'Humidity: ' + myData.humidity + '%'

    div.classList = 'container'
    div.appendChild(para)
    div.appendChild(img)
    div.appendChild(span)
    
    div.appendChild(h2)

    infoDiv.appendChild(div)
}

const display = () => {
    createContainer(city.value)
}
