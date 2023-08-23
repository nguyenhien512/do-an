import * as XLSX from 'xlsx'

export const createFilterForProp = (data, prop) => {
    let uniqueValues = data.map(e => e[prop]).filter((item, index, arr) => arr.indexOf(item) === index);
    return uniqueValues.map(e => ({
        text: e,
        value: e
    }))
}

export const createFilterForNestedProp = (data, prop, childProp) => {
    let uniqueValues = data.map(e => e[prop][childProp]).filter((item, index, arr) => arr.indexOf(item) === index);
    return uniqueValues.map(e => ({
        text: e,
        value: e
    }))
}

export const createFilterForYearProp = (data, prop) => {
    let uniqueValues = data.map(e => e[prop].match(/\d{4}/)[0]).filter((item, index, arr) => arr.indexOf(item) === index);
    return uniqueValues.map(e => ({
        text: e,
        value: e
    }))
}

export const flattenObject = (input) => {
    let result = {};
    for (const key in input) {
     if (!input.hasOwnProperty(key)) {
       continue;
     } 
     if (typeof input[key] === "object" &&!Array.isArray(input[key])) {
           var subFlatObject = flattenObject(input[key]);
           for (const subkey in subFlatObject) {
               result[key + "_" + subkey] = subFlatObject[subkey];
           }
       } else {
           result[key] = input[key];
       }
     }
     return result;
   }

export const groupObjectsByNestedProperty= (array, nestedProperty) => {
    return array.reduce((result, obj) => {
      const keys = nestedProperty.split('.');
      let currentValue = obj;
      for (const key of keys) {
        if (currentValue.hasOwnProperty(key)) {
          currentValue = currentValue[key];
        } else {
          return result; // Property not found, skip this object
        }
      }
      if (!result[currentValue]) {
        result[currentValue] = [];
      }
      result[currentValue].push(obj);
      return result;
    }, {});
  }