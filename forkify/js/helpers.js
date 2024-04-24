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

export const decimalToMixedNumber = function (decimal) {
  // Separate whole number part and fractional part
  const wholeNumber = Math.floor(decimal);
  const fractionalPart = decimal - wholeNumber;

  // Convert fractional part to a simplified fraction
  const tolerance = 1.0e-6; // Tolerance for floating-point comparison
  let numerator = Math.round(fractionalPart * 1000000); // Multiply by a large number to avoid floating-point errors
  let denominator = 1000000;
  let gcd = function (a, b) {
    return b < tolerance ? a : gcd(b, Math.floor(a % b));
  };
  gcd = gcd(numerator, denominator);
  numerator /= gcd;
  denominator /= gcd;

  // Combine whole number part and simplified fraction
  let result = "";
  if (wholeNumber !== 0) {
    result += wholeNumber;
    if (numerator !== 0) {
      result += " ";
    }
  }
  if (numerator !== 0) {
    result += `${numerator}/${denominator}`;
  }
  return result || ""; // If the input is 0, return "0"
};
