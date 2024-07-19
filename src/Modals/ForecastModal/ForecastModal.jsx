import MainModals from "../MainModals"
import "./ForecastModal.css"
import React, { useDebugValue, useEffect } from 'react'

export default function ForecastModal({ isvisible, onClose, data, location, forecast, isOtherDay }) {

  function kphToMps(kph) {
    const mps = (kph * 1000) / 3600;
    return mps.toFixed(2);
  }
  return (
    <MainModals name="Forecast" isvisible={isvisible} onClose={onClose} >
      <div className="container-forecast">
        <div className="header">
          {isOtherDay && <p>{forecast?.date}</p>}
          <p>Your Position</p>
          <p>{location?.name}</p>
          <p>
            {
              isOtherDay ? (
                Math.round(forecast?.day?.avgtemp_c)
              ) : (Math.round(data?.temp_c))
            }°
          </p>
          <p>{isOtherDay ? (forecast?.day?.condition?.text) : (data?.condition?.text)}</p>
          <p>Max: {isOtherDay ? (forecast?.day?.maxtemp_c) : (forecast[0]?.day?.maxtemp_c)}°C <span> | </span> Min: {isOtherDay ? (forecast?.day?.mintemp_c) : (forecast[0]?.day?.mintemp_c)}°C </p>
        </div>

        <div className="temperature">
          <div className="header">
            <p>General</p>
          </div>
          <div className="forecast-hour-slider">
            {
              !isOtherDay &&
              <div className="temperature-by-hour" >
                <span>Current</span>

                <img src={data?.condition?.icon} alt="" />
                <span className="chance_of_rain" style={{ visibility: "hidden" }}>0%</span>
                <p>{Math.round(data?.temp_c)}°</p>
              </div>
            }
            {
              isOtherDay ? forecast?.hour?.map((hour, index) => (
                <div className="temperature-by-hour" key={index}>
                  <span>{index}:00</span>

                  <img src={hour?.condition?.icon} alt="" />
                  {hour?.chance_of_rain > 0 ? (
                    <span className="chance_of_rain">{hour?.chance_of_rain}%</span>
                  ) : (<span className="chance_of_rain" style={{ visibility: "hidden" }}>0%</span>)}
                  <p>{Math.round(hour?.temp_c)}°</p>
                </div>
              )
              ) : forecast[0]?.hour?.map((hour, index) => {
                if (hour?.time > data?.last_updated) {
                  return (
                    <div className="temperature-by-hour" key={index}>
                      <span>{index}:00</span>

                      <img src={hour?.condition?.icon} alt="" />
                      {hour?.chance_of_rain > 0 ? (
                        <span className="chance_of_rain">{hour?.chance_of_rain}%</span>
                      ) : (<span className="chance_of_rain" style={{ visibility: "hidden" }}>0%</span>)}
                      <p>{Math.round(hour?.temp_c)}°</p>
                    </div>
                  )
                }

              }
              )
            }
          </div>
        </div>

        <div className="uv-and-feel">
          <div className="uv">
            <div className="header">
              <p>UV</p>
              <p>{isOtherDay ? forecast?.day.uv : data?.uv}</p>
            </div>
            <span className="uv-slider">
              <div className="point"></div>
            </span>
            {
              isOtherDay ?
                (
                  Math.round(forecast?.day.uv) > 8 ? (
                    <span>Danger</span>
                  ) : Math.round(forecast?.day.uv) > 6 ? (
                    <span>High</span>
                  ) : Math.round(forecast?.day.uv) > 3 ? (
                    <span>Medium</span>
                  ) : (
                    <span>Safe</span>
                  )
                ) : (

                  Math.round(data?.uv) > 8 ? (
                    <span>Danger</span>
                  ) : Math.round(data?.uv) > 6 ? (
                    <span>High</span>
                  ) : Math.round(data?.uv) > 3 ? (
                    <span>Medium</span>
                  ) : (
                    <span>Safe</span>
                  )

                )
            }



          </div>
          {
            isOtherDay ?
              (
                <div className="temerature-feel">
                  <div className="header">
                    <p>Humidity</p>
                    <p>{forecast?.day?.avghumidity}%</p>
                  </div>
                </div>
              ) : (
                <div className="temerature-feel">

                  <div className="header">
                    <p>Temperature feel</p>
                    <p>{data?.feelslike_c}°</p>
                  </div>
                  {Math.round(data?.feelslike_c) > Math.round(data?.temp_c) + 2 ? (
                    <span>Seem hotter the real temperature</span>
                  ) : <span>Like the real temperature</span>}
                </div>
              )
          }

        </div >

        {
          !isOtherDay && (
            <div className="wind-container">
              <p>Wind</p>
              <div className="wind-form">
                <div className="wind-info">
                  <p>{kphToMps(data?.wind_kph)}</p>
                  <div>
                    <p>m/s</p>
                    <p>Wind</p>
                  </div>
                </div>

                <div className="wind-info">
                  <p>{kphToMps(data?.gust_kph)}</p>
                  <div>
                    <p>m/s</p>
                    <p>Wind Gust</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div >
    </MainModals >
  )
}
