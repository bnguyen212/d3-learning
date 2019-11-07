/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const margin = {
  left: 150,
  top: 10,
  right: 10,
  bottom: 100
}

const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const g = d3.select("#chart-area").append("svg")
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`)

// add legends
g.append('text')
  .attr('class', 'y-axis-label')
  .attr('x', - height/2)
  .attr('y', -75)
  .attr("font-size", "20px")
  .attr('fill', 'blue')
  .attr("text-anchor", 'middle')
  .attr('transform', 'rotate(-90)')
  .text('Revenue')

  g.append('text')
  .attr('class', 'x-axis-label')
  .attr('x', width / 2)
  .attr('y', height + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", 'middle')
  .attr('fill', 'blue')
  .text('Months')

d3.json("data/revenues.json").then(data => {
  console.log(data)

  y = d3.scaleLinear()
    .domain([0, d3.max(data, e => e.revenue)])
    .range([height, 0])

  x = d3.scaleBand()
    .domain(data.map(e => e.month))
    .range([0, width])
    .paddingInner(0.1)
    .paddingOuter(0.1)

  const axisBottom = d3.axisBottom(x)
  const axisLeft = d3.axisLeft(y).ticks(5).tickFormat(e => `$${e}.00`)

  g.append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${height})`)
    .call(axisBottom)

  g.append('g')
    .attr('class', 'y-axis')
    .call(axisLeft)

  const rects = g.selectAll('rect').data(data);

  rects.enter()
    .append('rect')
    .attr('x', e => x(e.month))
    .attr('y', e => y(e.revenue))
    .attr('width', x.bandwidth)
    .attr('height', e => height - y(e.revenue))
    .attr('fill', 'blue')
})