import './WeatherCard.css'

const WeatherCard = ({date, temp, wind, humidity, icon}) => {
  function kphToMps(kph) { 
    const mps = (kph * 1000) / 3600;
    return mps.toFixed(2);
  }
  return (
    <div className='weather'>
        <div className='content'>
            <span className='date'>{date}</span>
            <img src={icon} alt='weather' />
            <span className='temp'>Temp: {temp} °C</span>
            <span className='wind'>Wind: {kphToMps(wind)} M/S</span>
            <span className='humidity'>Humidity: {humidity} %</span>
        </div>
    </div>
  )
}

export default WeatherCard