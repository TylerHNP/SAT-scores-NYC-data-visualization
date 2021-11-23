import { colors, mainData, groupbyBorough } from './defined.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderHorizontalBarChart(selection) {
    d3.select('#horizontal-bar-chart-div').selectAll("*").remove();
    var attribute = selection.attribute;

    var selectedRanges = selection.selectedRanges;
    var counts = {
        'Brooklyn': 0,
        'Bronx': 0,
        'Manhattan': 0,
        'Queens': 0,
        'Staten Island': 0,
    };

    for (var key of Object.keys(counts)) {
        var count = (groupbyBorough[key][attribute]).length;
        counts[key] = count;
    }


    var margin = { r: 0.03 * vw, l: 0.07 * vw, t: 0.014 * vw, b: 0.03 * vw };
    var width = 0.2 * vw - margin.r - margin.l;
    var height = 0.5 * vh - margin.t - margin.b;

    var x = d3.scale.linear().range([0, width]).domain([0, d3.max(Object.values(counts))]);
    var y = d3.scale.ordinal().rangeRoundBands([0, height], 0.3)
        .domain(Object.keys(counts));

    var data_ready = Object.entries(counts);

    var svg = d3.select('#horizontal-bar-chart-div').append("svg")
        .attr("width", width + margin.r + margin.l)
        .attr("height", height + margin.t + margin.b)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + margin.t + ")");

    var bars = svg.selectAll(".bar")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "bar")

    bars.append("rect")
        .attr("x", function (d) { return 0; })
        .attr("width", function (d) { return x(d[1]); })
        .attr("fill", function (d) {
            // return colors[d[0]][1];
            // return colors['all'][0];
            return "#bbdefb";
        })
        .transition()
        .duration(500)
        .attr("y", function (d) { return y(d[0]); })
        .attr("height", function (d) { return y.rangeBand(); })
        .attr("transform", "translate(" + margin.l + ", 0)");

    svg.append("g").attr("class", "y axis")
        .attr("transform", "translate(" + 3 + ", 0)")
        .attr("dx", '1em')
        .style('fill', 'transparent')
        .call(d3.svg.axis().scale(y).orient("left").tickSize(0));

    svg.selectAll("text").style('fill', 'white').style('text-anchor', 'start');
    svg.selectAll("line").style('fill', 'white');

    bars.append("text")
        .attr("class", "label")

        .attr("y", function (d) {
            return y(d[0]) + y.rangeBand() / 2 + 4;
        })

        .attr("x", function (d) {
            return x(d[1]) + 5 + margin.l;
        })
        .text(function (d) {
            return d[1];
        })
        .style('fill', 'white');

}