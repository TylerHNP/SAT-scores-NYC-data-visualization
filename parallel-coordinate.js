import { colors } from './defined.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderParallelCoordinates(mainData, selection, ranges) {
    d3.select('#parallel-coordinate-div').selectAll("*").remove();

    var margin = { r: 0.05 * vw, l: 0.005 * vw, t: 0.05 * vw, b: 0.01 * vw };
    var width = 0.45 * vw - margin.r - margin.l;
    var height = 0.43 * vh - margin.t - margin.b;

    var labels = ['avgScoreWriting', 'avgScoreReading', 'avgScoreMath', 'avgScoreTotal', 'studentEnrollment'];
    var y = {}
    for (var i in labels) {
        var label = labels[i]
        y[label] = d3.scale.linear()
            .domain([mainData[label]])
            .range([height, 0])
    }

    var x = d3.scale.ordinal()
        .rangePoints([0, width], 1)
        .domain(labels);

    var svg = d3.select('#parallel-coordinate-div').append("svg")
        .attr("width", width + margin.r + margin.l)
        .attr("height", height + margin.t + margin.b)
        .append("g")
        .attr("transform", "translate(" + margin.l + "," + margin.t + ")");


    svg
        .selectAll()
        .data(mainData)
        .enter().append("path")
        .attr("d", path)
        .style("fill", "transparent")
        .style("stroke", "orange")
        .style("opacity", 0.5)

    svg.selectAll(".tick").style('')
    svg.selectAll()
        .data(labels).enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        .each(function (d) { d3.select(this).call(d3.svg.axis().scale(y[d]).orient("left")); })
        .append("text")
        .style("text-anchor", "middle")
        .style("font-size", '13')
        .attr("y", -9)
        .text(function (d) { return d; })
        .style("fill", "white");

    function path(d) {
        return d3.line()(labels.map(function (p) { return [x(p), y[p](d[p])]; }));
    }






}