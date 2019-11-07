/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.8 - Activity: Your first visualization!
*/

d3.json("data/buildings.json").then(data => {
  console.log(data)
  const svg = d3.select('#chart-area').append('svg').attr('width', 500).attr('height', 500);
  const rects = svg.selectAll('rect').data(data);

  rects.enter()
    .append('rect')
    .attr('x', (building, i) => i * 50)
    .attr('y', 0)
    .attr('width', 40)
    .attr('height', building => building.height)
    .attr('fill', 'red')
})