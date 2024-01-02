import { updateGetSolarFunctionsLatAndLon } from "./entry.js";
import { getSolarData } from "./entry.js";

//Google Docs:
let map; // Declare the map variable
let marker; // Declare the marker variable

// export function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
//   });
// }

export function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 51.5074, lng: -0.1278 }, // Default center (London)
  });

  // Create an autocomplete object for the input
  const addressInput = document.getElementById("addressInput");
  const autocomplete = new google.maps.places.Autocomplete(addressInput);

  // Set the bounds to the map's viewport
  autocomplete.bindTo("bounds", map);

  // Listen for the event when a user selects a prediction from the dropdown
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const location = place.geometry.location;
      map.setCenter(location);
      map.setZoom(15);
      addMarker(location);
      updateGetSolarFunctionsLatAndLon([place]);
    } else {
      console.error("Invalid place details");
    }
  });
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(currentLocation);
          map.setZoom(15); // You can adjust the zoom level
          // Add a marker for the current location
          addMarker(currentLocation);
          getSolarData(
            position.coords.latitude,
            position.coords.longitude
          ).then(() => {
            resolve();
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject("Geolocation is not supported by this browser.");
    }
  });
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

export function resetMap() {
  location.reload();
}

// initMap();
