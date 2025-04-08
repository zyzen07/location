let latitude = "";
let longitude = "";

function getLocation() {
  if (navigator.geolocation) {
    const locationBtn = document.getElementById('getLocationBtn');
    const locationInfo = document.getElementById('locationInfo');
    const mapBtn = document.getElementById('mapBtn');

    locationBtn.textContent = "Fetching Location...";
    locationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
      function(position) {
        latitude = position.coords.latitude.toFixed(6);
        longitude = position.coords.longitude.toFixed(6);
        const accuracy = position.coords.accuracy.toFixed(2);

        document.getElementById("location_lat").textContent = latitude;
        document.getElementById("location_long").textContent = longitude;
        document.getElementById("location_accuracy").textContent = accuracy;

        locationInfo.style.display = "block";
        mapBtn.style.display = "inline-block";

        locationBtn.textContent = "Get Location";
        locationBtn.disabled = false;

        if (accuracy > 50) {
          alert(`Location accuracy is low (${accuracy}m). For better accuracy, ensure GPS is enabled, you're outdoors, and location services are allowed. Retrying might help.`);
        } else {
          console.log(`Location fetched successfully: Lat ${latitude}, Long ${longitude}, Accuracy ${accuracy}m`);
        }
      },
      function(error) {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please allow location permissions in your browser settings and try again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable. Ensure GPS is enabled and you're in an area with good signal.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Trying again might help, or check your network/GPS signal.";
            break;
          default:
            errorMessage = "An error occurred: " + error.message;
        }
        alert(errorMessage);
        locationBtn.textContent = "Get Location";
        locationBtn.disabled = false;
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function openMap() {
  if (latitude && longitude) {
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapUrl, "_blank");
  } else {
    alert("Location not available yet. Please fetch location first.");
  }
}
