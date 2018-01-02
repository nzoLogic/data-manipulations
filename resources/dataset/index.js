const fs = require('fs')
const path = require('path')
const id = 'objectID'
const _ = require('lodash')
const keys = [
  'objectID',
  'food_type',
 'stars_count',
 'reviews_count',
 'neighborhood',
 'phone_number',
 'price_range',
 'dining_style'
]

let writeStream = fs.createWriteStream('testData.json')
fs.readFile(path.join(__dirname, './restaurants_info') + '.csv', 'utf8',  function(err, data){
  if(err){
    console.log('ERROR: ' + err)
  } else {
    let a = data.split('\n')
    let newData = []
    const [ header, ...restaurants ] = a

    restaurants.forEach((row, index, array) => {
      let cols = row.split(';')
      let obj = {}
      for(let i = 0; i < cols.length; i++){
        let key = keys[i]
        if(cols[i] !== '') {
          obj[key] = ( i === 0 || i === 2 || i == 3 ) ? +cols[i] : cols[i]
        }
      }
      if(Object.keys(obj).length){
        newData.push(obj)
      }
    })
    writeStream.write(JSON.stringify(newData))
    writeStream.end()
  }
})


let details = fs.readFileSync(path.join(__dirname, '../testData') + '.json', 'utf8', function(err, data){
  if(err){
    console.log('Error: ' + err)
  }
  else {
    return data
  }
})

let list = fs.readFileSync(path.join(__dirname, './restaurants_list') + '.json', 'utf8', function(err, data){
  if(err){
    console.log('Error: ' + err)
  }
  else {
    return data
  }
})
details = JSON.parse(details)
list = JSON.parse(list)

let restaurants = _.merge( list, details)

let finalData = fs.createWriteStream('restaurants_data.json')

finalData.write(JSON.stringify(restaurants))
finalData.end()

fs.readFile(path.join(__dirname, '../restaurants_data') + '.json', 'utf8', function(err, data){
  console.log(JSON.parse(data))
})
