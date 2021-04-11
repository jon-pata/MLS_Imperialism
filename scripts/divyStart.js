// const topo = require('topojson-client')
// const fs = require('fs')
// const d3 = require('d3')
// const mathjs = require('math.js')
const fetch = require('node-fetch')

if(process.argv.length == 2){
  main(process.argv);
}else{
  console.log("Sorry, wrong arguments, please provide geoJSON file and JSON file of teams coordinates")
}

function main(args){
  console.log(args)
  let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
  let settings = { method: "Get" };

  fetch(url, settings)
      .then(res => res.json())
      .then((json) => {
          // do something with JSON
          console.log(json)
      });
}