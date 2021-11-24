export var mainData = {
    borough: [],
    id: [],
    schoolName: [],
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

export var mainMapData = {
    borough: [],
}

export var combinedData = {
    main: [],
}



var dataBrooklyn = {
    borough: [],
    id: [],
    schoolName: [],
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
    id: [],
    schoolName: [],
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
    id: [],
    schoolName: [],
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
    id: [],
    schoolName: [],
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
    id: [],
    schoolName: [],
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
        // "#e3f2fd",
        // "#bbdefb", 
        // "#90caf9",
        "#64b5f6",
        //  "#42a5f5", 
        // "#2196f3",
        "#1e88e5",
        // "#1976d2",
        // "#1565c0", 
        "#0d47a1"].reverse(),
    // 'all': [
    //     '#004274',
    //     '#39A0ED',
    //     '#ACD7F7'],
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
        '#FF7D75'],
    'Queens': [
        '#8E430D',
        '#E4572E',
        '#FFB49E'],
    'Staten Island': [
        '#672082',
        '#AB59CA',
        '#EDC1FE']
}






