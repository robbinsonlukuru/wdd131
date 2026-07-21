// ===== Footer: current year + last modified date =====
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// ===== Weather (static values) =====
const temperature = 10; // °C
const windSpeed = 5;    // km/h


function calculateWindChill(tempC, windKph) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKph, 0.16) + 0.3965 * tempC * Math.pow(windKph, 0.16);
}


let windChillDisplay;
if (temperature <= 10 && windSpeed > 4.8) {
  windChillDisplay = `${calculateWindChill(temperature, windSpeed).toFixed(1)} \u00B0C`;
} else {
  windChillDisplay = 'N/A';
}

document.getElementById('temperature').textContent = `${temperature} \u00B0C`;
document.getElementById('wind').textContent = `${windSpeed} km/h`;
document.getElementById('wind-chill').textContent = windChillDisplay;