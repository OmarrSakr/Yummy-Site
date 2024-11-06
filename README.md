# 🌦🕌 Realtime Weather and Prayer Times Application 

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/942375b2-9b00-4827-ab02-6fd6bfe0a080" alt="RealtimeWeather 1" style="width: 48%; margin-right: 1%;">
    <img src="https://github.com/user-attachments/assets/c0e3d16a-3e67-4d8b-8b3f-81eeacb7ade5" alt="RealtimeWeather 2" style="width: 48%;">
</div>
<div>
    <br>
</div>

- This project is a `Realtime Weather Application` that provides live weather data along with `daily prayer times`.
- This project is a <code>Dynamic website</code>.
- The website features a user-friendly interface and updates weather and prayer `data automatically` every day.
Below are the main sections of the website: 

---

## Live Demo 🌐
- Check out the live demo of the project at [`Realtime Weather and Prayer Times APP`](https://omarrsakr.github.io/Realtime-Weather-and-Prayer-Times-APP/).

---

## 🛠 Website Contents
<code>1. *Header*:</code>
  - *Site Title*: Displays "Weather & Prayer Times" with relevant icons.  
- *Search Fields*:  
  - *City Input Field*: Enter the name of a city to get weather data.  
  - *Search Button*: Fetches the weather of the specified city.  
  - *Current Location Button*: Retrieves weather and prayer times based on the user’s current location.  

<code>2. *Current Weather Section*:</code>
  - *Current Temperature*: Displays live temperature data in Celsius.  
- *Weather Icon*: Visual representation of the weather (e.g., sunny, rainy, cloudy).  
- *Additional Weather Info*:  
  - Current date and time.  
  - City name and country.  

<code>3. *5-Day Forecast Section* :</code>
 - *Daily Forecast Cards*: Each card displays:  
  - Weather icon for each day.  
  - Expected temperature.  
  - Day and date.  

<code> 4. *Today's Highlights* :</code>
  - *Air Quality Index (AQI)*: Displays air quality readings and pollutants such as PM2.5, PM10, CO, etc.  
- *Sunrise & Sunset Times*:  
  - Icons for sunrise and sunset with their respective times.  
- *Additional Indicators*:  
  - Humidity, Wind Speed, Pressure, Visibility, and Feels-Like Temperature.

<code> 5. *Hourly Forecast Section* </code>
 - Weather forecast by the hour (e.g., 6 AM, 9 AM, 12 PM).  
- Each block includes:  
  - Weather icon and forecasted temperature.

<code>6. *Prayer Times Section* :</code>
- *Today’s Date* and day.  
- *Prayer Cards*:  
  - Includes Fajr, Dhuhr, Asr, Maghrib, and Isha prayers.  
  - Displays icons and accurate prayer times for each prayer. 

<code> 7. *External Resources* :</code>
- *Font Awesome Icons* for visual enhancements.  
- *Google Fonts* for stylish typography (e.g., Roboto, Montserrat).  
- *Weather Images* stored locally in assets/Imgs. 

---

## 🚀 Navigation between Sections

- *Responsive Design*: The navigation bar adjusts for different screen sizes. On mobile devices, the navigation will be accessible through a toggle menu.
- *Smooth Scrolling*: When clicking on a section link, the page will smoothly scroll to the selected section.
- *Highlight Active Section*: The active section in the navigation bar will be highlighted for better user guidance as you scroll through the app.

---

## 🧑‍💻 Languages and Technologies Used

<code>HTML5:</code>
Provides the structure and content of the web pages.

<code>CSS3:</code>
Used for styling and layout, including frameworks like Bootstrap and Font Awesome for responsive design and iconography.

<code>JavaScript:</code>
Implements the application's logic and facilitates interactions with APIs to fetch real-time weather and prayer times data.

<code>APIs:</code>
Connects to weather and prayer times services to retrieve up-to-date information.

<code>JSON:</code>
Data format used to handle information retrieved from APIs.

---

## 🔑 API Integration
The application uses the following APIs:

<code>OpenWeather API:</code>
Retrieves current and forecast weather data.
API endpoint: https://api.openweathermap.org/data/2.5/

<code>Prayer Times API:</code>
Provides accurate prayer times for a specific location.
API endpoint: https://api.aladhan.com/v1/timings

---

## How to Use 🚀  

We welcome `contributions` to **Realtime Weather and Prayer Times Application**! Here’s how you can help:
1. *Fork the repository* - Click the "Fork" button at the top right of the repository page.
2. *Clone your fork* - Use the command:
   
   ```bash
   git clone https://github.com/OmarrSakr/Realtime-Weather-and-Prayer-Times-APP.git

---

## 📂 Project Structure 
```
📂 realtime-weather-prayer-times-app/
│  
├── 📁 *assets/*
│   └── 🖼 *Imgs/*          # Local images for weather and UI  
├── 🎨 *css/*
│   ├── 📝 *styles.css*     # Main stylesheet  
│   ├── 🌐 *all.min.css*    # Font Awesome Library
|   ├──  bootstrap.min.css    # ❌Bootstrap CSS for layout and styling
├── 🧑‍💻 *js/*
│   ├── ⚙ *app.js*         # Main logic for fetching weather and prayer data  
│   ├── bootstrap.bundle.min.js # ❌Bootstrap JavaScript bundle
│   ├── 
├── 📄 *index.html*         # Main HTML file  
└── 📕 *README.md*          # Documentation 

```
---

### 📌 Future Improvements

- 🌙 Add dark mode functionality for better usability at night.
- 🟢 <code>Offline Mode</code>: Save the latest data for offline viewing.
- 🌀 Integrate animations for a smoother user experience.
 
---

### Important Notes 📢

- This project is a Dynamic website.
-*API Keys*: Ensure that you have valid API keys for both the weather and prayer times services. You can obtain these from the respective service providers and should store them securely.
- *Internet Connection*: This application requires a stable internet connection to fetch real-time data. Please ensure you are connected to the internet for the best experience.
- *Device Compatibility*: The app is designed to be responsive and works best on modern browsers. It is recommended to test on different devices for optimal performance.
- *Timezone Settings*: Make sure to configure your timezone settings correctly to receive accurate prayer times and weather forecasts.
- *Cache Management*: If you experience issues with data loading, try clearing your browser's cache or refreshing the page.
- 📪 `*Feedback*`: If you encounter any bugs or have suggestions for improvements,📨 `please reach out via` the contact information provided in `the README` or through the issue `tracker` on GitHub.

---
