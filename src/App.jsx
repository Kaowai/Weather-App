import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import TodayWeather from './components/TodayWeather/TodayWeather'
import WeatherCard from './components/WeatherCard/WeatherCard'
import ClipLoader from "react-spinners/ClipLoader";

const App = () => {

  const [forecast, setForecast] = useState([])
  const [todayWeather, setTodayWeather] = useState({});
  const [city, setCity] = useState('');
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCityError, setIsCityError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isUseCurrentLocation, setIsUseCurrentLocation] = useState(false);  


  const fetchWeather = async (location) => {
    setIsLoading(true);
    try {
      const geo = location.lat + ',' + location.lon;
      const response = await axios.get('http://localhost:5000/api/forecast', {
        params: { city: geo, days: 5 }
      });
      localStorage.setItem('weatherData', JSON.stringify(response.data));
      console.log(response.data);
      setTodayWeather(response.data.current);
      const updatedForecast = response.data.forecast.forecastday.slice(1, 5);
      setForecast(updatedForecast);
      setLocation(response.data.location);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchWeatherBySearching = async () => { 
    if (city === '') {
      setIsCityError(true);
      return;
    }
    setIsCityError(false);
    setIsLoading(true);
    try {
      const response = await axios.get('https://weather-app-be.vercel.app/api/forecast', {
        params: { city, days: 5 }
      });
      localStorage.setItem('weatherData', JSON.stringify(response.data));
      console.log(response.data);
      setTodayWeather(response.data.current);
      const updatedForecast = response.data.forecast.forecastday.slice(1, 5);
      setForecast(updatedForecast);
      setLocation(response.data.location);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const loadMore = async () => {
    setIsLoadingMore(true);
    const amount = forecast?.length + 5;
    try {
      const response = await axios.get('https://weather-app-be.vercel.app/api/forecast', {
        params: { city, days: amount }
      });
      const updatedForecast1 = response.data.forecast.forecastday.slice(1, amount);
      setForecast(updatedForecast1);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }


  const getCurrentLocation = () => {
    setIsUseCurrentLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          };
          fetchWeather(location);
        },
        (error) => {
          console.log('Error fetching location: ' + error.message);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const showLess = () => { 
    setForecast(forecast.slice(0, 4));
  }

  useEffect(() => {
    setIsLoading(true);
    const data = localStorage.getItem('weatherData');
    if (data) {
      const updatedForecast = JSON.parse(data).forecast.forecastday.slice(1, 5);
      const date = JSON.parse(data).location.localtime.split(' ')[0];
      const today = new Date();
      
      if (today.toISOString().split('T')[0] !== date) {
        localStorage.removeItem('weatherData');
        setIsLoading(false);
        return;
      } else {
        setForecast(updatedForecast);
        setTodayWeather(JSON.parse(data).current);
        setLocation(JSON.parse(data).location);
      }
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>
          Weather Dashboard
        </h1>
        <span className='register'>Register</span>
      </header>

      <main>
        <div className="side-bar">
          <span>Enter a city Name</span>
          <div className='input-search'>
            <input type="text" placeholder='E.g., New York, London, Tokyo' onChange={(e) => { setCity(e.target.value); setIsCityError(false) }} />
            {isCityError && <span className='error'>* Please enter a city name</span>}
          </div>


          <button className='button-search' onClick={fetchWeatherBySearching}>Search</button>
          <div className='spacing'>
            <div style={
              {
                borderBottom: '1px solid #6c757d',
                width: '50%',
                height: '0px'
              }
            }></div>
            <span>or</span>
            <div style={
              {
                borderBottom: '1px solid #6c757d',
                width: '50%',
                height: '0px'
              }
            }></div>
          </div>
          <button className='button-use' onClick={getCurrentLocation}>Use Current Location</button>
        </div>

        {
          isLoading ? <ClipLoader color='#3B82F6' loading={isLoading} size={25} className='spinner' />
            : isError ? <div className='error'>Not found the city</div>
              :
              <div className="weather-forecast">
                <TodayWeather location={location} temp={todayWeather?.temp_c} wind={todayWeather?.wind_kph
                } humidity={todayWeather?.humidity} icon={todayWeather?.condition?.icon} text={todayWeather?.condition?.text} />
                <span className='heading'>{forecast?.length}-Day Forecast</span>
                <div className='forecast-card'>
                  {
                    forecast?.map((weather, index) => (
                      <WeatherCard key={index} date={weather.date} temp={weather?.day?.avgtemp_c} wind={weather?.day?.maxwind_kph} humidity={weather?.day?.avghumidity} icon={weather?.day?.condition?.icon} />
                    ))
                  }

                  {
                    isLoadingMore && <ClipLoader color='#3B82F6' loading={isLoadingMore} size={25} className='spinner' /> 
                  }
                </div>
                <div className='container-button'>
                  <button className='button-load' onClick={loadMore}>Load More</button>
                  {
                    forecast?.length > 4 && <button className='button-less' onClick={showLess}>Show less</button>
                  }
                </div>
              </div>
        }
      </main>
    </div>
  )
}

export default App