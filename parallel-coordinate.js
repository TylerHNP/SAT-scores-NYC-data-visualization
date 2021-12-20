import { colors, combinedData } from './defined.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderParallelCoordinates(selection) {
    d3.select('#parallel-coordinate-div').selectAll("*").remove();

    var margin = { r: 0.00 * vw, l: 0.000 * vw, t: 0.05 * vw, b: 0.02 * vw };
    var width = 0.6 * vw - margin.r - margin.l;
    var height = 0.6 * vh - margin.t - margin.b;
    var selectedBoroughs = selection.boroughs;
    var selectedSchools = selection.schools;
    var isSchoolsEmpty = selectedSchools.length === 0;
    var ranges = selection.selectedRanges.map((index) => (selection.ranges[index]));
    var labels = ['avgScoreWriting', 'avgScoreReading', 'avgScoreMath', 'avgScoreTotal', 'studentEnrollment'];
    var y = {}
    for (var i of labels) {
        var label = i
        y[label] = d3.scale.linear()
            .domain(d3.extent(combinedData.main, function (p) { return p[label] }))
            .range([height, 0]);

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
        .data(combinedData.main)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", "transparent")
        .style("stroke", function (d) {
            if (selectedBoroughs.includes(d.borough) && (isSchoolsEmpty || selectedSchools.includes(d.id))) {
                var dp = d[selection.attribute];
                for (var i = 0; i < ranges.length; i++) {
                    if (dp >= ranges[i][0] && dp < ranges[i][1]) {
                        return colors['all'][selection.ranges.indexOf(ranges[i])];
                    }
                }
                return '#2C2C2B';
            }
            else {
                return '#2C2C2B';
            }

        })
        .style("opacity", function (d) {
            if (selectedBoroughs.includes(d.borough)) {
                return 0.5;
            }
            return 0.3;
        })
        .style("z-index", function (d) {
            if (selectedBoroughs.includes(d.borough)) {
                return 3;
            }
            return 1;
        });

    svg.selectAll(".tick").style('fill', 'transparent')

    svg.selectAll()
        .data(labels).enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        .each(function (d) {
            d3.select(this).call(d3.svg.axis().scale(y[d]).orient("left"));
        })
        .append("text")
        .style("text-anchor", "middle")
        .style("font-size", '1rem')
        .attr("y", -10)
        .text(function (d) { return d; });

    svg.selectAll("text").style('fill', 'white')

    function path(d) {
        return d3.svg.line()(labels.map(function (p) {
            return [x(p), y[p](d[p])];
        }));
    }






}