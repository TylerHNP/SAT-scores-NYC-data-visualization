import { colors, mainData, mainMapData } from './defined.js';

var vw = window.innerWidth;
var vh = window.innerHeight;

export function renderMap(selection) {
    d3.select('#map-div').selectAll("*").remove();
    console.log(selection);
    var width = 0.45 * vw;
    var height = 0.9 * vh;
    var ranges = selection.ranges;
    var latitude = mainData.latitude;
    var longtitude = mainData.longtitude;
    var boroughs = mainData.borough;
    var attributeValues = mainData[selection.attribute];
    var points = latitude.map((e, i) => [longtitude[i], e, boroughs[i], attributeValues[i]]);
    var projection = d3.geo.mercator()
        .scale(height * 90)
        .center([-73.945242, 40.700610])
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
        .x(d3.scale.linear().range([0, width]))
        .y(d3.scale.linear().range([0, height]))
        .on('brush', function brushend() {
            var extent = brush.extent();
            svg.select('.brush').call(brush.clear());
            brushed(extent);
        });

    mapLayer.selectAll('path')
        .data(mainMapData.borough)
        .enter().append('path')
        .attr('d', path)
        .attr('vector-effect', 'non-scaling-stroke')
        .style('paint-order', 'stroke')
        .style('stroke', '#161613')
        .style('stroke-width', '2')
        .style('fill', function (d) {
            return '#2C2C2B';
        });
    // .on('mouseover', mouseover)
    // .on('mouseout', mouseout);



    svg.selectAll('.circle')
        .data(points)
        .enter()
        .append('circle')
        .attr("cx", function (d) { return projection(d)[0]; })
        .attr("cy", function (d) { return projection(d)[1]; })
        .attr("r", "0.3em")
        .attr("fill",
            function (d) {
                for (let j = 0; j < ranges.length; j++) {
                    if (d[3] >= ranges[j][0] && d[3] < ranges[j][1]) {
                        return colors['all'][j];
                    }
                }
                return '#919191';
            }
        );

    svg.append('g').call(brush);

    function brushed(extent) {
        console.log(extent);

    }


    // function mousein(d) {
    //     d3.select(this).style('fill', "#bbdefb");
    //     var borough = d.properties.boro_name;
    //     svg.selectAll('circle')
    //         .style('fill', function (d) {
    //             for (let j = 0; j < ranges.length; j++) {
    //                 if (d[2] === borough && d[3] >= ranges[j][0] && d[3] < ranges[j][1]) {
    //                     return colors['all'][j];
    //                 }
    //             }
    //             return '#444444';
    //         });

    // }

    // function mouseout(d) {
    //     mapLayer.selectAll('path')
    //         .style('fill', '#2C2C2B');
    //     svg.selectAll('circle')
    //         .style('fill', function (d) {
    //             for (let j = 0; j < ranges.length; j++) {
    //                 if (d[3] >= ranges[j][0] && d[3] < ranges[j][1]) {
    //                     return colors['all'][j];
    //                 }
    //             }
    //             return '#444444';
    //         });
    // }
}