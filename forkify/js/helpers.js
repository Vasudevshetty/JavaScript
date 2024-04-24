import { TIMEOUT } from "./config";
import icons from "../img/icons.svg";

function timeout(seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} seconds`)
      );
    }, seconds * 1000);
  });
}

export const AJAX = async function (url, uploadData) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPromise, timeout(TIMEOUT)]);
    const data = response.json();
    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const setLocalStorage = function (key, object) {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};
