import React, {useState,useEffect} from 'react';

const api = {
    key: "40acf02750075ed3fd3a925d5cd9886f",
    base: "https://api.openweathermap.org/data/2.5/",
};


function App() {
    const [searchInput,setSearchInput] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [weatherInfo, setWeatherInfo] = useState("");

    useEffect(()=> {
        const fetchWeatherData = async () => {
            if (!searchCity) return;
            setLoading(true);
            try {
                const url =`${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
                const response = await fetch(url);
                const data = await response.json();
                if(response.ok) {
                    setWeatherInfo(`${data.name},${data.sys.country} ${data.weather[0].description}, ${data.main.temp}`);
                    setErrorMessage("");
                } else {
                    setErrorMessage(data.message);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
            setLoading(false)
        };
        fetchWeatherData();
    }, [searchCity]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput);
    }

  return (
    <>
    <div style = {{color:"green"}} class="header">Weather App</div>
    <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="City" value={searchInput} onChange = {(e) => setSearchInput(e.target.value)}></input>
        <button>Search</button>
    </form>
    {loading ? (
        <div>Loading...</div>
        ) : (
        <> 
            {errorMessage ? (
            <div style = {{color:"red"}}> {errorMessage} </div>
            ) : (
            <div> {weatherInfo} </div>
            )}
        </>
  )};
</>
);
};  

export default App;
