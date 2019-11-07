/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
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
	.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`)

g.append('text')
	.attr('class', 'y-axis-label')
	.attr('x', - height/2)
	.attr('y', -75)
	.attr("font-size", "20px")
	.attr('fill', 'blue')
	.attr("text-anchor", 'middle')
	.attr('transform', 'rotate(-90)')
	.text('Life Expectancy')

g.append('text')
	.attr('class', 'x-axis-label')
	.attr('x', width / 2)
	.attr('y', height + 50)
	.attr("font-size", "20px")
	.attr("text-anchor", 'middle')
	.attr('fill', 'blue')
	.text('Income')

var timeLabel = g.append("text")
	.attr("y", height -10)
	.attr("x", width - 40)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")
	.text("1800");

const y = d3.scaleLinear()
	.domain([0, 90])
	.range([height, 0])
const axisLeft = d3.axisLeft(y)
g.append('g')
	.call(axisLeft)

const x = d3.scaleLog()
	.base(10)
	.domain([300, 150000])
	.range([0,width])
const axisBottom = d3.axisBottom(x).tickValues([400, 4000, 40000]).tickFormat(e => +e)
g.append('g')
	.attr('transform', `translate(0, ${height})`)
	.call(axisBottom)

const continents = d3.scaleOrdinal()
	.domain(["africa", "asia", "americas", "europe", "australia"])
	.range(d3.schemeSet1)

const population = d3.scaleLinear()
	.domain([2000, 1400000000])
	.range([25*Math.PI, 625*Math.PI])

d3.json("data/data.json").then(data => {
	let yearIndex = 0;

	data = data.map(year => {
		year.countries = year.countries.filter(c => c.income && c.life_exp)
		year.countries = year.countries.map(c => {
			c.income = +c.income;
			c.life_exp = +c.life_exp;
			return c
		})
		return year
	})


	d3.interval(() => {
		update(data[yearIndex])
		yearIndex = (yearIndex + 1) % data.length
	}, 100);
	
})

const update = data => {
	var t = d3.transition()
		.duration(100);

	const circles = g.selectAll("circle")
		.data(data.countries, c => c.country)

	circles.exit().remove()

	circles.enter()
		.append("circle")
		.attr('fill', e => continents(e.continent))
		.merge(circles)
		.transition(t)
			.attr('cx', e => x(e.income))
			.attr('cy', e => y(e.life_exp))
			.attr('r', e => Math.sqrt(population(e.population)/3.14))
	
	timeLabel.text(data.year)
}