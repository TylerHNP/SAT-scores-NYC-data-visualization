import { colors } from './defined.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderBarChart(dataIn, dataBorough, selection, ranges, lowerLimit = null, upperLimit = null, index = null) {
    d3.select('#histogram-div').selectAll("*").remove();
    var toRet = {};
    var counts = calculateBarData(dataIn, dataBorough, selection, ranges, lowerLimit, upperLimit, index);

    var margin = { r: 0.05 * vw, l: 0.005 * vw, t: 0.015 * vw, b: 0.03 * vw };
    var width = 0.45 * vw - margin.r - margin.l;
    var height = 0.4 * vh - margin.t - margin.b;

    var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.3)
        .domain(Object.keys(counts));

    var maxHeight = d3.max(Object.values(counts).map((countArr) => d3.max(countArr)));
    var y = d3.scale.linear().range([height, 0])
        .domain([0, maxHeight]);

    var subgroups = ['0', '1', '2'];

    var xSubgroup = d3.scale.ordinal()
        .domain(subgroups)
        .rangeRoundBands([0, x.rangeBand()], 0.1)


    var color = d3.scale.ordinal()
        .domain(subgroups)
        .range(colors[selection])


    var data_ready = Object.entries(counts);

    var svg = d3.select('#histogram-div').append("svg")
        .attr("width", width + margin.r + margin.l)
        .attr("height", height + margin.t + margin.b)
        .append("g")
        .attr("transform", "translate(" + margin.l + "," + margin.t + ")");



    svg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + (height + margin.b / 4) + ")")
        .attr("dy", '4em')
        .style('fill', 'transparent')
        .call(d3.svg.axis().scale(x).orient("bottom").tickSize(0));

    svg.selectAll("text").style('fill', 'white');
    svg.selectAll("line").style('fill', 'white');



    var bars = svg.selectAll(".bar")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "bar")
        .attr("transform", function (d) { return "translate(" + x(d[0]) + ",0)"; })
        .selectAll("rect")
        .data(function (d) {
            return d[1].map((value, key) => { return { 'key': key, 'value': value }; });
        })
        .enter();

    bars.append("rect")
        .attr("x", function (d) { return xSubgroup(d.key); })
        .attr("width", xSubgroup.rangeBand())
        .attr("fill", function (d) { return color(d.key); })
        .transition().duration(500)
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); });

    bars.append("text")
        .text(function (d) { return (d.value === 0 ? '' : d.value); })
        .attr("x", function (d) { return xSubgroup(d.key) + xSubgroup.rangeBand() / 2; })
        .attr("y", function (d) { return y(d.value) - 10; })
        .attr("text-anchor", "middle")
        .style('fill', 'white');

    toRet.update = function (nDataIn, nDataBorough, nSelection, nRanges) {
        console.log('update is called');
        var nCounts = calculateBarData(nDataIn, nDataBorough, nSelection, nRanges);

        var nMaxHeight = d3.max(Object.values(nCounts).map((countArr) => d3.max(countArr)));

        var nY = d3.scale.linear().range([height, 0])
            .domain([0, nMaxHeight]);

        var nColor = d3.scale.ordinal()
            .domain(subgroups)
            .range(colors[selection]);

        var nData_ready = Object.entries(nCounts);


        bars = svg.selectAll('.bar').data(nData_ready);

        bars.selectAll("rect")
            .transition().duration(500)
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("y", function (d) { console.log(d); return nY(d.value);; })
            .attr("height", function (d) { return height - nY(d.value); })
            .attr("fill", function (d) { return nColor(d.key); });

        bars.selectAll("text")
            .transition().duration(500)
            .text(function (d) { return d.value; })
            .attr("y", function (d) { return nY(d.value) - 10; })
            .attr("text-anchor", "middle")
            .style('fill', 'white');

    };
    return toRet;



}

function calculateBarData(dataIn, dataBorough, selection, ranges, lowerLimit, upperLimit, index) {

    var counts = {
        'Brooklyn': [0, 0, 0],
        'Bronx': [0, 0, 0],
        'Manhattan': [0, 0, 0],
        'Queens': [0, 0, 0],
        'Staten Island': [0, 0, 0],
    };

    for (let i = 0; i < dataIn.length; i++) {
        if (ranges) {
            for (let j = 0; j < 3; j++) {
                if (dataIn[i] >= ranges[j][0] && dataIn[i] < ranges[j][1]) {
                    counts[dataBorough[i]][j]++;
                }
            }
        }
        else {
            if (dataIn[i] >= lowerLimit && dataIn[i] < upperLimit) {
                counts[dataBorough[i]][index]++;
            }
        }
    }
    console.log(counts);
    return counts;


}