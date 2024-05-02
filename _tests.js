import { getDecoded } from "./index.js";
import { encoded, decoded } from "./_fixtures.js";
import { translations } from "./data.js";

const isEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((obj1, index) => {
    const obj2 = array2[index];
    return Object.keys(obj1).every((key) => {
      if (obj1[key] !== obj2[key]) {
        console.log("!!!!!!!!!!!!!!!", obj1[key]);
      }
      return obj1[key] === obj2[key];
    });
  });
};

if (!isEqual(getDecoded(encoded, translations), decoded)) {
  console.log(getDecoded(encoded, translations));
  throw new Error("Incorrect work!");
}

console.log("Correct work!");
