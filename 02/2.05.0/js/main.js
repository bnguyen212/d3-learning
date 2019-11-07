/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

const svg = d3.select('#chart-area').append('svg').attr('width', 500).attr('height', 300)

const rect = svg.append('rect').attr('x', 10).attr('y', 20).attr('height', 100).attr('width', 300).attr('fill', 'blue')

const line = svg.append('line').attr('x1', 5).attr('y1', 25).attr('x2', 400).attr('y2', 260).attr('stroke', "green").attr('stroke-width', 3)

const ellipse = svg.append('ellipse').attr('cx', 100).attr('cy', 150).attr('rx', 50).attr('ry', 75).attr('fill', 'yellow')