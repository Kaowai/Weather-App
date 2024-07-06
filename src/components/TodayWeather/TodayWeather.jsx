import React from 'react'
import './TodayWeather.css'
const TodayWeather = ({location, temp, wind, humidity, icon, text}) => {
  function kphToMps(kph) { 
    const mps = (kph * 1000) / 3600;
    return mps.toFixed(2);
  }
  return (
    <div className='container-weather'>
      <div className='container-info'>
        <span>{location?.name} ({location?.localtime?.split(' ')[0]})</span>
        <span className='temp'>Temp: {temp} °C</span>
        <span className='wind'>Wind: {kphToMps(wind)} M/S</span>
        <span className='humidity'>Humidity: {humidity} %</span>
      </div>
      <div className='status'>
        <img src={icon} alt='weather' />
        <span>{text}</span>
      </div>
    </div>
  )
}

export default TodayWeather