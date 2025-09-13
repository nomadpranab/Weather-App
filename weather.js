const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const weatherSection = document.getElementById('weather');
const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  weatherSection.innerHTML = `<div class="col-span-2 text-center text-amber-500">Loading...</div>`;

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=aa3f81eb244a4561bec80218251309&q=${encodeURIComponent(city)}`
    );
    const data = await response.json();
    console.log(data.current.humidity);

    if (!response.ok || data.error) {
      weatherSection.innerHTML = `<div class="col-span-2 text-center text-red-500">City not found.</div>`;
      return;
    }
    
    weatherSection.innerHTML = `


      <div class="col-span-2 text-center">
        <h2 class="text-2xl font-bold mb-2">${data.location.name}, ${data.location.country}</h2>
        <div class="text-lg mb-4">${data.current.condition.text}</div>
      </div>

      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Temp</div>
        <div class="text-xl font-bold">${data.current.temp_c}°C</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Feels Like</div>
        <div class="text-xl font-bold">${data.current.feelslike_c}°C</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Humidity</div>
        <div class="text-xl font-bold">${data.current.humidity}%</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Wind</div>
        <div class="text-lg">${data.current.wind_kph} km/h</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Cloud Cover</div>
        <div class="text-lg">${data.current.cloud}%</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Wind Direction</div>
        <div class="text-lg">${data.current.wind_dir}</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">Precipitation</div>
        <div class="text-lg">${data.current.precip_mm} mm</div>
      </div>
      <div class="bg-gray-700/60 rounded-lg p-4">
        <div class="text-sm">UV Index</div>
        <div class="text-lg">${data.current.uv}</div>
      </div>
    `;
  } catch (error) {
    weatherSection.innerHTML = `<div class="col-span-2 text-center text-red-500">Error fetching data.</div>`;
  }
});
