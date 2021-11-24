import { mainData, groupbyBorough, mainMapData, combinedData } from './defined.js';
import { renderPie } from './pieChart.js';
import { calculateRanges } from './quantile.js';
import { renderHorizontalBarChart } from './horizontalbarChart.js';
import { renderParallelCoordinates } from './parallel-coordinate.js';
import { renderMap } from './map.js'

var selectionState;
var pieChart;
var barChart;

function loadData() {
    return new Promise((resolve, reject) => {
        var id = 0;
        d3.csv("data-new.csv", function (data) {
            data.map(function (d) {
                var borough = d.Borough;
                var toAdd = {
                    id: id,
                    schoolName: d.SchoolName,
                    avgScoreWriting: +d.Writing,
                    avgScoreReading: +d.Reading,
                    avgScoreMath: +d.Math,
                    avgScoreTotal: +d.Total,
                    studentEnrollment: +d.StudentEnrollment,
                    borough: borough,
                    percentWhite: (parseFloat(d.PercentWhite)),
                    percentBlack: (parseFloat(d.PercentBlack)),
                    percentHispanic: (parseFloat(d.PercentHispanic)),
                    percentAsian: (parseFloat(d.PercentAsian)),
                    percentTested: (parseFloat(d.PercentTested)),
                };
                combinedData.main.push(toAdd);
                mainData.borough.push(borough);
                mainData.id.push(id);
                mainData.schoolName.push(d.SchoolName);
                mainData.studentEnrollment.push(+d.StudentEnrollment);
                mainData.latitude.push(+d.Latitude);
                mainData.longtitude.push(+d.Longitude);
                mainData.percentWhite.push(parseFloat(d.PercentWhite));
                mainData.percentBlack.push(parseFloat(d.PercentBlack));
                mainData.percentHispanic.push(parseFloat(d.PercentHispanic));
                mainData.percentAsian.push(parseFloat(d.PercentAsian));
                mainData.percentTested.push(parseFloat(d.PercentTested));
                mainData.avgScoreMath.push(+d.Math);
                mainData.avgScoreReading.push(+d.Reading);
                mainData.avgScoreWriting.push(+d.Writing);
                mainData.avgScoreTotal.push(+d.Total);
                groupbyBorough[borough].borough.push(borough);
                groupbyBorough[borough].id.push(id);
                groupbyBorough[borough].schoolName.push(d.SchoolName);
                groupbyBorough[borough].studentEnrollment.push(+d.StudentEnrollment);
                groupbyBorough[borough].latitude.push(+d.Latitude);
                groupbyBorough[borough].longtitude.push(+d.Longitude);
                groupbyBorough[borough].percentWhite.push(parseFloat(d.PercentWhite));
                groupbyBorough[borough].percentBlack.push(parseFloat(d.PercentBlack));
                groupbyBorough[borough].percentHispanic.push(parseFloat(d.PercentHispanic));
                groupbyBorough[borough].percentAsian.push(parseFloat(d.PercentAsian));
                groupbyBorough[borough].percentTested.push(parseFloat(d.PercentTested));
                groupbyBorough[borough].avgScoreMath.push(+d.Math);
                groupbyBorough[borough].avgScoreReading.push(+d.Reading);
                groupbyBorough[borough].avgScoreWriting.push(+d.Writing);
                groupbyBorough[borough].avgScoreTotal.push(+d.Total);
                id++;
            });

        });

        d3.json('boroughs.geojson', function (error, mapData) {
            mainMapData.borough = mapData.features;
            resolve();
        });

    })

}

window.onload = function () {

    loadData().then(reset);

}
window.runAttr = function () {
    var newAttribute = document.getElementById('pie-attr').value;
    console.log("attribute is changed to" + newAttribute);
    selectionState.attribute = newAttribute;
    selectionState.ranges = calculateRanges(mainData[selectionState.attribute]);
    renderPie(selectionState);
    renderMap(selectionState);
    renderHorizontalBarChart(selectionState);
    renderParallelCoordinates(selectionState);
}

export function reset() {
    selectionState = {
        boroughs: [
            'Brooklyn',
            'Bronx',
            'Manhattan',
            'Queens',
            'Staten Island'],
        schools: [],
        ranges: [],
        attribute: 'avgScoreTotal',
        selectedRanges: [],
    }
    selectionState.ranges = calculateRanges(mainData[selectionState.attribute]);
    selectionState.selectedRanges = [0, 1, 2];
    update(selectionState);
};

export function update(selection) {
    renderPie(selection);
    renderMap(selection);
    renderHorizontalBarChart(selection);
    renderParallelCoordinates(selection);
}


