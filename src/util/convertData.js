export const convertScore = (score) => {
    return score + "-" + (parseInt(score) + 1)
}

export const convertColor = (level) => {
    switch (level) {
        case "LEVEL_1" :
            return "#FF9999"
        case "LEVEL_2" :
            return "#6699FF"
        case "LEVEL_3" :
            return "#CC9933"
        default:
            return "#CC66FF"
    }
}