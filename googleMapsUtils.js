//Google Docs:
import { updateGetSolarFunctionsLatAndLon } from "./entry.js";
import { getSolarData } from "./entry.js";

let map; // Declare the map variable
let marker; // Declare the marker variable

export function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
  });
}

export function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(currentLocation);
        map.setZoom(15); // You can adjust the zoom level
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        // Add a marker for the current location
        addMarker(currentLocation);
        getSolarData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

export function searchAddress() {
  const addressInput = document.getElementById("addressInput").value;
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: addressInput }, (results, status) => {
    if (status === "OK" && results[0].geometry) {
      const location = results[0].geometry.location;
      map.setCenter(location);
      map.setZoom(15); // You can adjust the zoom level

      // Add a marker for the searched address
      addMarker(location);
      //   updateGetSolarFunctionsLatAndLon(location);

      updateGetSolarFunctionsLatAndLon(results);
    } else {
      console.error(
        "Geocode was not successful for the following reason:",
        status
      );
    }
  });
}

export function addMarker(location) {
  // Remove previous marker
  if (marker) {
    marker.setMap(null);
  }

  // Add a new marker
  marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Selected Location",
  });
}
initMap();
