//DOM Ref
// const geoButton = document.getElementById("geo-button");

// export function getSolarLocation() {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(success, error);

//     function success(data) {
//       //   const { latitude, longitude } = data.coords;
//       //   console.log(data);
//       //   getSolarData(latitude, longitude);
//       resolve(data);
//     }

//     function error(error) {
//       //   console.log(data);
//       reject(error);
//     }
//   });
// }

// Update the getSolarLocation function to use browser geolocation
export function getSolarLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject("Geolocation is not supported by this browser.");
    }
  });
}
