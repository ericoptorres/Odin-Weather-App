
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

const createSwitchBtn = () =>{
    const btn = document.createElement('button')
    btn.classList.add('switchBtn')
    btn.textContent = 'Switch format'
    btn.addEventListener('click', () => {
        selectedCelsius = !selectedCelsius
        selectFormat(selectedCelsius)
        infoDiv.innerHTML = ''
        display()
    })
    return btn
}

let selectedCelsius = true
const selectFormat = (data) => {
    let format 
    if (selectedCelsius){
        format = data.tempCelsius + 'ºC'
    }
    else {
        format = data.tempFarenheit + 'ºF'
    }
    return format
}

const createContainer = async (city) => {
    const div = document.createElement('div')
    const para = document.createElement('p')
    const span = document.createElement('span')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const alignDiv = document.createElement('div')
    const btn = createSwitchBtn()
    
    const myData = await requestInfo(city)

    para.textContent = `${myData.name}, ${myData.country}:`
    span.textContent = selectFormat(myData)
    img.src = "https://" + myData.weather
    h2.textContent = 'Humidity: ' + myData.humidity + '%'

    div.classList = 'container'

    div.appendChild(para)
    alignDiv.appendChild(img)
    alignDiv.appendChild(span)
    alignDiv.appendChild(btn)
    div.appendChild(alignDiv)
    div.appendChild(h2)

    infoDiv.appendChild(div)
}

const display = () => {
    createContainer(city.value, selectedCelsius)
}

