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