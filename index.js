let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
let educationURL = 'https://raw.githubusercontent.com/jon-pata/MLS_Imperialism/dev-april/Resources/test/Instances.json'

let countyData
let educationData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawMap = () => {
    canvas.selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('fill', (countyDataItem) => {
            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })
            let teamId = county['teamId']
            return teams[teamId-1].color
            // if (teamId == 1) {
            //     return teams[0].color
            // } else if (teamId == 2) {
            //     return 'orange'
            // } else if (percentage <= 45) {
            //     return 'lightgreen'
            // } else {
            //     return 'limegreen'
            // }
        })
        .attr('data-fips', (countyDataItem) => {
            return countyDataItem['id']
        })
        .attr('data-education', (countyDataItem) => {
            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })
            let percentage = county['bachelorsOrHigher']
            return percentage
        })
        .on('mouseover', (countyDataItem) => {
            tooltip.transition()
                .style('visibility', 'visible')

            let id = countyDataItem['id']
            let county = educationData.find((item) => {
                return item['fips'] === id
            })

            tooltip.text(county['fips'] + ' - ' + county['area_name'] + ', ' +
                county['state'] + ' : ' + teams[county['teamId']-1].name)

            tooltip.attr('data-education', county['bachelorsOrHigher'])
        })
        .on('mouseout', (countyDataItem) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })
}

d3.json(countyURL).then(
    (data, error) => {
        if (error) {
            console.log(log)
        } else {
            countyData = topojson.feature(data, data.objects.counties).features
            console.log(countyData)

            d3.json(educationURL).then(
                (data, error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        educationData = data
                        console.log(educationData)
                        drawMap()
                    }
                }
            )
        }
    }
)
var teams = [
    {
        "id": 1,
        "name": "Atlanta United",
        "color": "#80000A"
    },
    {
        "id": 2,
        "name": "Chicago Fire",
        "color": "#121F48"
    },
    {
        "id": 3,
        "name": "FC Cincinnati",
        "color": "#FE5000"
    },
    {
        "id": 4,
        "name": "Colorado Rapids",
        "color": "#862633"
    },
    {
        "id": 5,
        "name": "Colombus Crew",
        "color": "#FEF200"
    }
]