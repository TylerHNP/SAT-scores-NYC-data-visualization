import { colors, groupbyBorough } from './defined.js';
import { update, reset } from './script.js'

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

    var rangesIn = selection.ranges;

    var ranges = [];
    for (var rangeIndex of selectedRanges) {
        ranges.push(rangesIn[rangeIndex]);
    }

    var selectedBoroughs = selection.boroughs;
    var selectedSchools = selection.schools;

    for (var key of Object.keys(counts)) {
        var data = groupbyBorough[key][attribute];
        if (selectedSchools.length !== 0) {
            var ids = groupbyBorough[key]['id'];
            var newData = [];
            for (let i = 0; i < ids.length; i++) {
                if (selectedSchools.includes(ids[i])) {
                    newData.push(data[i]);
                }
            }
            data = newData;
        }
        var count = (data).filter(
            function (dp) {
                for (var range of ranges) {
                    if (dp >= range[0] && dp < range[1]) {
                        return true;
                    }
                }
                return false;
            }
        ).length;
        counts[key] = count;
    }

    var margin = { r: 0.03 * vw, l: 0.07 * vw, t: 0.014 * vw, b: 0.001 * vh };
    var width = 0.25 * vw - margin.r - margin.l;
    var height = 0.3 * vh - margin.t - margin.b;

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
        .attr("y", function (d) { return y(d[0]); })
        .attr("height", function (d) { return y.rangeBand(); })
        .on('mousedown', mousedown)
        .style("cursor", 'pointer')


        .attr("transform", "translate(" + margin.l + ", 0)")
        .attr("width", function (d) { return x(d[1]); })
        .attr("x", function (d) { return 0; })
        .style("fill", function (d) {
            if (selectedBoroughs.includes(d[0])) {
                if (selectedRanges.length === 1) {
                    return colors['all'][selectedRanges[0]];
                }
                return "#c2c2cb";
            }
            return '#444444';

        })


    svg.append("g").attr("class", "y axis")
        .attr("transform", "translate(" + 3 + ", 0)")
        .attr("dx", '1em')
        .style('fill', 'transparent')
        .call(d3.svg.axis().scale(y).orient("left").tickSize(0));

    svg.selectAll("text").style('fill', 'white').style('text-anchor', 'start');
    svg.selectAll("line").style('fill', 'white');

    bars.data(data_ready).enter();

    bars.append("text")
        .attr("class", "label")

        .attr("y", function (d) {
            return y(d[0]) + y.rangeBand() / 2 + 4;
        })

        .attr("x", function (d) {
            return x(d[1]) + 5 + margin.l;
        })
        .text(function (d) {
            return d[1] !== 0 ? d[1] : '';
        })
        .style('fill', 'white');


    function mousedown(d) {
        if (selectedBoroughs.includes(d[0])) {
            selectedBoroughs = selectedBoroughs.filter((e) => e !== d[0]);
            selection.boroughs = selectedBoroughs;
        }
        else {
            selection.boroughs.push(d[0]);
        }
        update(selection);
    }
};