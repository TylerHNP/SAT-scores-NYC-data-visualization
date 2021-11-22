export var mainData = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};



var dataBrooklyn = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};

var dataBronx = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};

var dataManhattan = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};

var dataQueens = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};

var dataStatenIsland = {
    borough: [],
    zipCode: [],
    latitude: [],
    longtitude: [],
    studentEnrollment: [],
    percentWhite: [],
    percentBlack: [],
    percentHispanic: [],
    percentAsian: [],
    percentTested: [],
    avgScoreMath: [],
    avgScoreReading: [],
    avgScoreWriting: [],
    avgScoreTotal: []
};

export var groupbyBorough = {
    'Brooklyn': dataBrooklyn,
    'Bronx': dataBronx,
    'Manhattan': dataManhattan,
    'Queens': dataQueens,
    'Staten Island': dataStatenIsland,
}

export var labels = new Map([
    ["borough", 'Borough Area of School'],
    ["zipCode", 'Zip Code of School'],
    ["latitude", 'Latitude of School'],
    ["longtitude", 'Longtitude of School'],
    ["studentEnrollment", "Student Enrollment to SAT test"],
    ["percentWhite", "Percentage of white students"],
    ["percentBlack", "Percentage of black students"],
    ["percentHispanic", "Percentage of hispanic students"],
    ["percentAsian", "Percentage of asian students"],
    ["percentTested", "Percentage of tested students"],
    ["avgScoreMath", "Average score of SAT Math"],
    ["avgScoreReading", "Average score of SAT reading"],
    ["avgScoreWriting", "Average score of SAT writing"],
    ["avgScoreTotal", "Average total SAT score"]]);


export var colors = {
    'all': [
        '#004274',
        '#39A0ED',
        '#ACD7F7'],
    'Brooklyn': [
        '#00725C',
        '#36F1CD',
        '#BFFFF3'
    ],
    'Bronx': [
        '#7C5810',
        '#F7B32B',
        '#FEDE9F'],
    'Manhattan': [
        '#9A251D',
        '#FF4D4D',
        '#FFAAA5'],
    'Queens': [
        '#8E430D',
        '#E4572E',
        '#FFB49E'],
    'Staten Island': [
        '#672082',
        '#AB59CA',
        '#EDC1FE']
}






