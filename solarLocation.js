//DOM Ref
// const geoButton = document.getElementById("geo-button");

export function getSolarLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(data) {
      //   const { latitude, longitude } = data.coords;
      //   console.log(data);
      //   getSolarData(latitude, longitude);
      resolve(data);
    }

    function error(error) {
      //   console.log(data);
      reject(error);
    }
  });
}
