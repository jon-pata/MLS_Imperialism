// const topo = require('topojson-client')
// const fs = require('fs')
// const d3 = require('d3')
// const mathjs = require('math.js')
const fetch = require('node-fetch')
const counties = require('../Resources/test/gz_2010_us_050_00_500k.json')
const teams = require('../Resources/test/Teams.json')
const mathjs = require('mathjs')
const fs = require('fs');

if(process.argv.length == 2){
  main(process.argv);
}else{
  console.log("Sorry, wrong arguments, please provide geoJSON file and JSON file of teams coordinates")
}

function main(args){
  console.log(args)
  let data = JSON.stringify(getAllCentroids());
  fs.writeFileSync('newStartingData.json', data)
}

function getAllCentroids(){
  let features = counties.features;
  countyCentroids =[]

  for (let feature of features){
    let geometry = feature.geometry
    //console.log(feature.properties.NAME);
    let countyTemp = {};

    let centroid = geometry.type == 'Polygon' ? getPolygonCentroid(geometry.coordinates[0]) : getMultiPolygonCentroid(geometry.coordinates)

    countyTemp.fips = feature.properties.STATE + feature.properties.COUNTY;
    if(countyTemp.fips.startsWith('0')){
      countyTemp.fips = countyTemp.fips.substring(1);
      countyTemp.fips = parseInt(countyTemp.fips);
    }
    countyTemp.state = feature.properties.STATE;
    countyTemp.name = feature.properties.NAME;
    countyTemp.centroid = centroid;
    countyTemp.teamId = findClosestTeam(centroid);

    countyCentroids.push(countyTemp);
    //console.log(centroid)
  }
  return countyCentroids;
}

function getPolygonCentroid(points){
  let centroid = []
  let clong = 0;
  let clat = 0;
  for(let i = 0; i<points.length;i++){
    let point = points[i]
    let long = parseFloat(point[0])
    let lat = parseFloat(point[1])
    clat += lat
    clong += long
  }
  clat /= points.length
  clong /= points.length
  centroid.push(clat)
  centroid.push(clong)
  return centroid
}

function getMultiPolygonCentroid(polys){
  let centroid = []
  let clong = 0;
  let clat = 0;
  for(let poly of polys){
    let polyCentroid = getPolygonCentroid(poly[0])
    clong += polyCentroid[0]
    clat += polyCentroid[1]
  }
  clong /= polys.length
  clat /= polys.length
  centroid.push(clat)
  centroid.push(clong)
  return centroid
}

function findClosestTeam(countyCentroid){
  //console.log(teams)
  let lowestDist = 10000;
  let lowestTeam = teams[1];
  for(let team of teams){
    let dist = mathjs.distance(countyCentroid, team.coords);
    if(dist < lowestDist){
      lowestDist = dist;
      lowestTeam = team;
    }
  }
  return lowestTeam.id;
}