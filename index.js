import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

const shouldDecode = (key, value, translations) =>
  key.endsWith("Id") &&
  key !== "groupId" &&
  value !== null &&
  translations.hasOwnProperty(value);

export const getDecoded = (encoded, translations) => {
  const decoded = encoded.map((item) => {
    const newItem = {};

    Object.entries(item).forEach(([key, value]) => {
      if (shouldDecode(key, value, translations)) {
        newItem[key] = translations[value];
      } else {
        newItem[key] = value;
      }
    });
    return newItem;
  });

  return decoded;
};

export const getUniqueId = (encoded, translations) => {
  const uniqueIdCounter = {};

  encoded.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (shouldDecode(key, value, translations)) {
        uniqueIdCounter[value] = (uniqueIdCounter[value] || 0) + 1;
      }
    });
  });

  return Object.entries(uniqueIdCounter)
    .filter(([, count]) => count === 1)
    .map(([id]) => id);
};

const decoded = getDecoded(encoded, translations);
const uniqueId = getUniqueId(encoded, translations);

console.log("decoded list ==>", decoded, "uniqueId list ==>", uniqueId);
