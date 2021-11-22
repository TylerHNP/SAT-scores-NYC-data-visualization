import { calculateRanges } from './quantile.js';
import { labels, colors, mainData } from './defined.js';
import { renderBarChart } from './barChart.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderPie(dataIn, key, selection) {
    d3.select('#pie-div').selectAll("*").remove();
    var toRet = {};
    var width = 0.20 * vw;
    var height = 0.45 * vh;
    var margin = 0.015 * vw;
    var outerRadius = Math.min(width, height) / 3.5 + margin;
    var innerRadius = Math.min(width, height) / 3.5 - margin;

    var counts = []
    var ranges = calculateRanges(dataIn);

    var buckets = new Array(3).fill(0);
    for (var dp of dataIn) {
        for (let i = 0; i < 3; i++) {
            if (dp >= ranges[i][0] && dp < ranges[i][1]) {
                buckets[i]++;
            }
        }
    }

    var rangeNames = [' < 25th percentile', '> 25th percentile', '> 75th percentile'];
    var percentPad = labels.get(key).includes('Percentage') ? "%" : '';
    for (let j = 0; j < 3; j++) {
        var str = ranges[j][0] + percentPad + ' - ' + ranges[j][1] + percentPad;
        counts.push({
            'name': rangeNames[j],
            'str': str,
            'index': j,
            'count': buckets[j],
            'range': ranges[j]
        });
    }

    var svg = d3.select("#pie-div")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scale.ordinal()
        .domain(rangeNames)
        .range(colors[selection]);

    var pie = d3.layout.pie().value(function (d) {
        return d.count;
    });

    var data_ready = pie(counts);

    svg.append("text")
        .attr("font-size", "1.8em")
        // .attr('dy', '0.3em')
        .text(dataIn.length)
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .style('text-align', 'center');

    svg.append("text")
        .attr("font-size", "0.8 em")
        .attr('dy', '1.2em')
        .text('schools')
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .style('text-align', 'center');

    svg.selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
        )
        .attr('fill', function (d) {
            return (color(d.data.name))
        })
        .attr("stroke", '#161613')
        .style("stroke-width", "4px")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    function mouseover(d) {
        renderBarChart(mainData[key], mainData.borough, 'all', null, d.data.range[0], d.data.range[1], d.data.index);
    }

    function mouseout(d) {
        renderBarChart(mainData[key], mainData.borough, 'all', ranges);
    }



    var legend = d3.select("#pie-div")
        .append("table")
        .attr("width", 0.23 * vw)
        .attr('class', 'legend');

    var tr = legend.append("tbody")
        .selectAll("tr")
        .data(data_ready)
        .enter()
        .append("tr");

    tr.append("td")
        .append("svg").attr("width", '0.8em')
        .attr("height", '0.8em').append("rect")
        .attr("width", '0.8em')
        .attr("height", '0.8em')
        .attr("fill", function (d) {
            return color(d.data.name);
        });
    tr.append("td").text(function (d) { return d.data.name; });

    tr.append("td").attr("class", 'legendRange')
        .text(function (d) { return d.data.str; });

    tr.append("td").attr("class", 'legendCount')
        .text(function (d) { return d.data.count.toString() + ' schools'; });

    toRet.ranges = ranges;
    return toRet;
}