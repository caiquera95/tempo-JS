document.querySelector('.busca').addEventListener('submit', async (event) =>{
    event.preventDefault(); //Previni o corpotamento padrão que o formulário deveria ter

    let input = document.querySelector('#searchInput').value;
    //Tendo acesso ao que o usuário digitou 

    if(input !== ''){
        clearInfo();
        showWarning('Buscando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=473c99c7e814a128dea703966c3c4fa0&units=metric&lang=pt_br`
        
        let results = await fetch(url); //Await = esperar o resultado. Em seguida armazenou na let results

        let json = await results.json(); // Transformando o resultado em Json

        console.log(json);

        if (json.cod === 200 ){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning ('Não encontramos essa localização.') 
        }
    } 
});

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block'

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
} 