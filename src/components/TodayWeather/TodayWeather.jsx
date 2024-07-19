import React from 'react'
import './TodayWeather.css'
const TodayWeather = ({location, data, onSeeDetail}) => {
  function kphToMps(kph) { 
    const mps = (kph * 1000) / 3600;
    return mps.toFixed(2);
  }
  return (
    <div className='container-weather'>
      <div className='container-info'>
        <span>{location?.name} ({location?.localtime?.split(' ')[0]})</span>
        <span className='temp'>Temp: {data?.temp_c} °C</span>
        <span className='wind'>Wind: {kphToMps(data?.wind_kph)} M/S</span>
        <span className='humidity'>Humidity: {data?.humidity} %</span>
        <span className="see-more" onClick={onSeeDetail}>See more</span>
      </div>
      <div className='status'>
        <img src={data?.condition?.icon} alt='weather' />
        <span>{data?.condition?.text}</span>
      </div>
    </div>
  )
}

export default TodayWeather