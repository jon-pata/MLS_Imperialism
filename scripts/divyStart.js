// const topo = require('topojson-client')
// const fs = require('fs')
// const d3 = require('d3')
// const mathjs = require('math.js')
const fetch = require('node-fetch')
const counties = require('../Resources/test/gz_2010_us_050_00_500k.json')
const teams = require('../Resources/test/Teams.json')

if(process.argv.length == 2){
  main(process.argv);
}else{
  console.log("Sorry, wrong arguments, please provide geoJSON file and JSON file of teams coordinates")
}

function main(args){
  console.log(args)
  getAllCentroids();
}

function getAllCentroids(){
  let features = counties.features;

  for (let feature of features){
    let geometry = feature.geometry
    console.log(feature.properties.NAME);

    let centroid = geometry.type == 'Polygon' ? getPolygonCentroid(geometry.coordinates[0]) : getMultiPolygonCentroid(geometry.coordinates)

    console.log(centroid)
  }
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
  centroid.push(clong)
  centroid.push(clat)
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
  centroid.push(clong)
  centroid.push(clat)
  return centroid
}