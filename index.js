let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
//let educationURL = 'https://raw.githubusercontent.com/jon-pata/MLS_Imperialism/dev-april/Resources/test/Instances.json'
let educationURL = 'https://raw.githubusercontent.com/jon-pata/MLS_Imperialism/dev-april/scripts/newStartingData.json'

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
      "color": "#80000A",
      "coords": [
        33.755,
        -84.400
      ]
    },
    {
      "id": 2,
      "name": "Austin FC",
      "color": "#00B140",
      "coords": [
        30.38773,
        -97.71956
      ]
    },
    {
      "id": 3,
      "name": "Chicago Fire",
      "color": "#121F48",
      "coords": [
        41.862,
        -87.617
      ]
    },
    {
      "id": 4,
      "name": "FC Cincinnati",
      "color": "#FE5000",
      "coords": [
        39.11103,
        -84.52286
      ]
    },
    {
      "id": 5,
      "name": "Colorado Rapids",
      "color": "#862633",
      "coords": [
        39.80568,
        -104.89178
      ]
    },
    {
      "id": 6,
      "name": "DC United",
      "color": "#EE1A39",
      "coords": [
        38.83840,
        -77.01285
      ]
    },
    {
      "id": 7,
      "name": "FC Dallas",
      "color": "#D11241",
      "coords": [
        33.15431,
        -96.83517
      ]
    },
    {
      "id": 8,
      "name": "Houston Dynamo",
      "color": "#121F48",
      "coords": [
        29.75224,
        -95.35224
      ]
    },
    {
      "id": 9,
      "name": "Inter Miami",
      "color": "#F7B5CD",
      "coords": [
        26.19329,
        -80.16067
      ]
    },
    {
      "id": 10,
      "name": "LA Galaxy",
      "color": "#00245D",
      "coords": [
        33.86434,
        -118.26112
      ]
    },
    {
      "id": 11,
      "name": "Los Angeles FC",
      "color": "#000000",
      "coords": [
        34.01277,
        -118.28405
      ]
    },
    {
      "id": 12,
      "name": "Minnesota United",
      "color": "#585958",
      "coords": [
        44.95311,
        -93.16470
      ]
    },
    {
      "id": 13,
      "name": "CF Montreal",
      "color": "#2B63AD",
      "coords": [
        45.56307,
        -73.55266
      ]
    },
    {
      "id": 14,
      "name": "New England Revolution",
      "color": "#E51938",
      "coords": [
        42.09094,
        -71.26435
      ]
    },
    {
      "id": 15,
      "name": "NYCFC",
      "color": "#862633",
      "coords": [
        40.82964,
        -73.92624
      ]
    },
    {
      "id": 16,
      "name": "NY Redbulls",
      "color": "#FEF200",
      "coords": [
        40.73687,
        -74.15031
      ]
    },
    {
      "id": 17,
      "name": "Orlando City SC",
      "color": "#80000A",
      "coords": [
        28.54108,
        -81.38904
      ]
    },
    {
      "id": 18,
      "name": "Philadelphia Union",
      "color": "#121F48",
      "coords": [
        39.83281,
        -75.37849
      ]
    },
    {
      "id": 19,
      "name": "Portland Timbers",
      "color": "#FE5000",
      "coords": [
        45.52159,
        -122.69180
      ]
    },
    {
      "id": 20,
      "name": "Real Salt Lake",
      "color": "#862633",
      "coords": [
        40.58293,
        -111.89336
      ]
    },
    {
      "id": 21,
      "name": "San Jose Earthquakes",
      "color": "#FEF200",
      "coords": [
        37.35114,
        -121.92465
      ]
    },
    {
      "id": 22,
      "name": "Seattle Sounders",
      "color": "#121F48",
      "coords": [
        47.59516,
        -122.33164
      ]
    },
    {
      "id": 23,
      "name": "Sporting Kansas City",
      "color": "#FE5000",
      "coords": [
        39.12159,
        -94.82321
      ]
    },
    {
      "id": 24,
      "name": "Toronto FC",
      "color": "#862633",
      "coords": [
        43.63323,
        -79.41858
      ]
    },
    {
      "id": 25,
      "name": "Vancouver Whitecaps",
      "color": "#FEF200",
      "coords": [
        49.27678,
        -123.11200
      ]
    },
    {
      "id": 26,
      "name": "Columbus Crew",
      "color": "#121F48",
      "coords": [
        39.96851,
        -83.01730
      ]
    },
    {
      "id": 27,
      "name": "Nashville SC",
      "color": "#FE5000",
      "coords": [
        36.16646,
        -86.77127
      ]
    }
  ]