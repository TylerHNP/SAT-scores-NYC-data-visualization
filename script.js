import { mainData, groupbyBorough } from './defined.js';
import { renderPie } from './pieChart.js';
import { renderBarChart } from './barChart.js';
import { renderParallelCoordinates } from './parallel-coordinate.js';
import { boroughs } from './boroughs.js'

var pieChart;
var barChart;

function loadData() {
    return new Promise((resolve, reject) => {
        d3.csv("data-new.csv", function (data) {

            data.map(function (d) {

                var borough = d.Borough;
                mainData.borough.push(borough);
                mainData.zipCode.push(+d.ZipCode);
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
                groupbyBorough[borough].zipCode.push(+d.ZipCode);
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
            });
            resolve();
        });
    })

}

window.onload = function () {
    loadData().then(
        function () {
            pieChart = renderPie(mainData.avgScoreTotal, 'avgScoreTotal', 'all');
            barChart = renderBarChart(mainData.avgScoreTotal, mainData.borough, 'all', pieChart.ranges);
            renderParallelCoordinates(mainData, 'all', pieChart.ranges);
        }
    )
};

window.runAttr = function () {
    var key = document.getElementById('pie-attr').value;
    console.log("the key is changed to" + key);
    var pieChart = renderPie(mainData[key], key, 'all');
    var barChart = renderBarChart(mainData[key], mainData.borough, 'all', pieChart.ranges);
    // barChart.update(mainData[key], mainData.borough, 'all', pieChart.ranges);
}

var mapboxAccessToken = 'pk.eyJ1IjoidHlsZXJobnAiLCJhIjoiY2t2dnU5bzhiMDV5dzJwbm9qZ2NhZHY1cCJ9.aHdj1f8dPW52SnUHTRTrsg';
var map = L.map('map').setView([40.70, -73.94], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);


L.geoJson(boroughs).addTo(map);

