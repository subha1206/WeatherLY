window.addEventListener('load', () => {
    let long;
    let lat;

    // select html element

    let tempzone = document.querySelector('.location-timezone');
    let tempdegreesec = document.querySelector('.temp-degree');
    let tempDesc = document.querySelector('.temp-desc');
    let change = document.querySelector('.degree-sec');
    let changeS = document.querySelector('.degree-sec span');
    let humid = document.querySelector('.humidity');
    let uvInd = document.querySelector('.uvIndex');
    let windSpd = document.querySelector('.wind');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            let long = pos.coords.longitude;
            let lat = pos.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'; 
            const api = `${proxy}https://api.darksky.net/forecast/9e05320b430ba38bfd59d9fb67c1f091/${lat},${long}`;
            fetch(api)
                .then(res => {
                    return res.json();
                })
                .then(data => {

                    // take out the data from api
                    console.log(data);
                    
                    const { temperature, summary, icon, humidity, windSpeed,uvIndex} = data.currently;
                    tempdegreesec.textContent = temperature;
                    tempzone.textContent = data.timezone;
                    tempDesc.textContent = summary;
                    humid.textContent = humidity;
                    uvInd.textContent = uvIndex;
                    windSpd.textContent = windSpeed;

                    let cel = (temperature - 32) * (5 / 9);

                    // set icon
                    setIcon(icon, document.querySelector('.icon'));
                    
                    // temp changing
                    change.addEventListener('click', () => {
                        if (changeS.textContent === 'F') {
                            changeS.textContent = 'C'
                            tempdegreesec.textContent = Math.floor(cel);
                        } else {
                            changeS.textContent = 'F'
                            tempdegreesec.textContent = temperature;
                        }
                    })
                })
        })
    }
    
    function setIcon(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        // beacuse all the icon are not available
        // const curIcon = icon.replace(/-/g, '_').toUpperCase();
        // const curIcon = 'rain'
        skycons.play();
        return skycons.set(iconId, 'PARTLY_CLOUDY_DAY')
    }
    
})