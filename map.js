import { colors, mainData, mainMapData } from './defined.js';
import { update } from './script.js';

var vw = window.innerWidth;
var vh = window.innerHeight;
const boroughList = ['Brooklyn',
    'Bronx',
    'Manhattan',
    'Queens',
    'Staten Island'];

export function renderMap(selection) {
    d3.select('#map-div').selectAll("*").remove();
    var width = 0.4 * vw;
    var height = 0.9 * vh;
    var ranges = [];
    for (var range of selection.selectedRanges) {
        ranges.push(selection.ranges[range]);
    }
    // console.log(ranges);
    var latitude = mainData.latitude;
    var longtitude = mainData.longtitude;
    var boroughs = mainData.borough;
    var attributeValues = mainData[selection.attribute];
    var selectedBoroughs = selection.boroughs;
    // console.log(selectedBoroughs);
    // console.log(selection.schools.length);
    var ids = mainData.id;
    var schoolNames = mainData.schoolName;
    var points = latitude.map((e, i) => [longtitude[i], e, boroughs[i], attributeValues[i], ids[i], schoolNames[i]]);
    var projection = d3.geo.mercator()
        .scale(height * 90)
        .center([-73.975242, 40.700610])
        .translate([width / 2, height / 2]);




    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select('#map-div').append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append('g');

    var mapLayer = g.append('g')
        .classed('map-layer', true);

    var brush = d3.svg.brush()
        .x(d3.scale.identity().domain([0, width]))
        .y(d3.scale.identity().domain([0, height]))
        .on('brushend', function brushend() {
            var extent = brush.extent();
            svg.select('brush').call(brush.clear());
            brushed(extent);
        });

    mapLayer.selectAll('path')
        .data(mainMapData.borough)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style('paint-order', 'stroke')
        .style('stroke',
            function (d) {
                return '#161613';
            }
        )
        .style('stroke-width', '2')
        .style('fill', function (d) {
            return '#2C2C2B';
        });



    var tooltip = d3.select("#map-div")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")
        .style("position", 'absolute')
        .style("top", 0);
    svg.call(brush);

    svg.selectAll('.circle')
        .data(points)
        .enter()
        .append('circle')
        .attr("cx", function (d) { return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", "0.3em")
        .style("fill",
            function (d) {
                for (let j = 0; j < ranges.length; j++) {
                    if (d[3] >= ranges[j][0] && d[3] < ranges[j][1]) {
                        return colors['all'][selection.ranges.indexOf(ranges[j])];
                    }
                }
                return 'none';
            }
        )
        .style("z-index", 10)
        .style('opacity', function (d) {
            if (selectedBoroughs.includes(d[2]) && selection.schools.length === 0) {
                return 1;
            }
            if (selection.schools.includes(d[4]) && selectedBoroughs.includes(d[2])) {
                return 1;
            }
            return 0.05;
        })
        .style("cursor", 'pointer')
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("mousedown", mousedown);



    function brushed(extent) {
        var selectedSchools = [];
        // console.log('brushed called');
        var x0 = extent[0][0],
            x1 = extent[1][0],
            y0 = extent[0][1],
            y1 = extent[1][1];
        // console.log(x0, x1, y0, y1);
        let newBoroughs = new Set();
        svg.selectAll('circle').style('opacity',
            function (d) {
                var cx = projection(d)[0];
                var cy = projection(d)[1];
                if (x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1) {
                    selectedSchools.push(d[4]);
                    newBoroughs.add(d[2]);
                    return 1;
                }
                else {
                    return 0.05;
                }

            });
        if (selectedSchools.length < mainData['id'].length && selectedSchools.length > 0) {
            selection.schools = selectedSchools;
            selection.boroughs = [...newBoroughs];
            update(selection);
        }
        else {
            // console.log('reset to all');
            selection.schools = [];
            selection.boroughs = [...boroughList];
            console.log(selection.boroughs);
            update(selection);
        }

    }

    function mouseover(d) {
        tooltip
            .html(d[5] + '<br/> Borough - ' + d[2])
            .style("left", (d3.mouse(this)[0]) - 50 + "px")
            .style("top", (d3.mouse(this)[1]) - 80 + "px");
        tooltip
            .style("opacity", 1)
        console.log("mouse over");
        console.log(d[5]);
    }
    function mouseout(d) {
        tooltip
            .style("opacity", 0);
        tooltip.style("top", 0)
    }
    function mousedown(d) {
        // console.log(d.data.index);
        // if (selectedRanges.includes(d.data.index)) {
        //     var newRanges = selectedRanges.filter((e) => e !== d.data.index);
        //     selection.selectedRanges = [...newRanges];
        //     update(selection);
        // }
        // else {
        //     selectedRanges.push(d.data.index);
        //     selection.selectedRanges = selectedRanges;
        //     update(selection);
        // }

    }

}