import { calculateRanges } from './quantile.js';
import { labels, colors, mainData, groupbyBorough } from './defined.js';
import { update } from './script.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderPie(selection) {
    d3.select('#pie-div').selectAll("*").remove();
    d3.select('#legend-div').selectAll("*").remove();
    var width = 0.2 * vw;
    var height = 0.3 * vh;
    var margin = 0.001 * vw;
    var outerRadius = Math.min(width, height) / 2.2;
    var innerRadius = Math.min(width, height) / 3.2 - margin;
    var counts = []
    var ranges = selection.ranges;

    var dataIn = [];
    var boroughs = selection.boroughs;
    var selectedRanges = selection.selectedRanges;
    // console.log('pie chart');
    // console.log(selectedRanges);

    var selectedSchools = selection.schools;

    for (var borough of boroughs) {
        var data = groupbyBorough[borough][selection.attribute];
        if (selectedSchools.length !== 0) {
            var ids = groupbyBorough[borough]['id'];
            var newData = [];
            for (let i = 0; i < ids.length; i++) {
                if (selectedSchools.includes(ids[i])) {
                    newData.push(data[i]);
                }
            }
            data = newData;
        }
        dataIn.push(...data);
    }

    var buckets = new Array(3).fill(0);
    for (var dp of dataIn) {
        for (let i = 0; i < 3; i++) {
            if (dp >= ranges[i][0] && dp < ranges[i][1]) {
                buckets[i]++;
            }
        }
    }

    // console.log(buckets);

    var rangeNames = ['low (< 25th percentile)', 'medium (> 25th percentile)', 'high (> 75th percentile)'];
    var percentPad = labels.get(selection.attribute).includes('Percentage') ? "%" : '';
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

    // console.log(counts);

    var svg = d3.select("#pie-div")
        .append("svg")
        .attr("width", width - margin)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    var pie = d3.layout.pie().value(function (d) {
        return d.count;
    });

    var tooltip = d3.select("#pie-div")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    var data_ready = pie(counts);

    svg.append("text")
        .attr("class", 'pie-center-label')
        .attr("font-size", "1.8em")
        // .attr('dy', '0.3em')
        .text(dataIn.length)
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .style('text-align', 'center');

    svg.append("text")
        .attr("font-size", "0.8 em")
        .attr("class", 'pie-center-suffix')
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

        .style('fill', function (d) {
            if (selectedRanges.includes(d.data.index)) {
                return colors['all'][d.data.index];
            }
            return '#444444';

        })
        .style("stroke", '#161613')
        .style("stroke-width", "4px")
        .style("cursor", 'pointer')
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseout", mouseout)
        .on("mousedown", mousedown);

    function mouseover(d) {
        tooltip
            .style("opacity", 1)
    }
    function mousemove(d) {

        tooltip
            .html(d.data.count.toString() + ' schools <br/> range  (' + d.data.str + ')')
            .style("left", (d3.mouse(this)[0] + width / 2 + 10) + "px")
            .style("top", (d3.mouse(this)[1]) + height / 2 - 40 + "px")
            .style("position", 'absolute')
    }
    function mouseout(d) {
        tooltip
            .style("opacity", 0)
    }
    function mousedown(d) {
        // console.log(d.data.index);
        if (selectedRanges.includes(d.data.index)) {
            var newRanges = selectedRanges.filter((e) => e !== d.data.index);
            selection.selectedRanges = [...newRanges];
            update(selection);
        }
        else {
            selectedRanges.push(d.data.index);
            selection.selectedRanges = selectedRanges;
            update(selection);
        }

    }


    var legend = d3.select("#legend-div")
        .append("table")
        .attr('class', 'legend')
        .style('margin', 'auto 0');

    var tr = legend.append("tbody")
        .selectAll("tr")
        .data(data_ready)
        .enter()
        .append("tr");

    tr.append("td")
        .append("svg").attr("width", '1.5em')
        .attr("height", '1.5em').append("rect")
        .attr("width", '1.5em')
        .attr("height", '1.5em')
        .attr("fill", function (d) {
            return colors['all'][d.data.index];
        });

    tr.append("td").text(function (d) { return d.data.name; });

    // tr.append("td").attr("class", 'legendRange')
    //     .text(function (d) { return d.data.str; });

    // tr.append("td").attr("class", 'legendCount')
    //     .text(function (d) { return d.data.count.toString() + ' schools'; });
}