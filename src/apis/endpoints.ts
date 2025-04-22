export const endpoints = {
  getWeather: (lat: number, lon: number) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_OPENWEATHERMAP_API_KEY}`,
};
