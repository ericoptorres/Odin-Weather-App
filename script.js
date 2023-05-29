
function requestInfo(location){
    fetch(`http://api.weatherapi.com/v1/current.json?key=6915f6a4a5c5410c813184808232605&q=${location}`, {mode: 'cors'})
    .then(res => res.json())
    .then(data => filterData(data))
    

}

requestInfo('london')


const filterData = async (data) => {
    const filtered = await {
        name: data.location.name,
        tempCelsius: data.current.temp_c,
        tempFarenheit: data.current.temp_f,
        humidity: data.current.humidity
    }
    console.log(filtered)
    return filtered
    
}

