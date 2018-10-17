const axios = require('axios')

module.exports = {
  getData(req,res){
    const latitude = req.body.latitude
    const longtitude = req.body.longtitude
    const ZomatoAPI = process.env.ZOMATO
    const zomatoUrl = `https://developers.zomato.com/api/v2.1/search?lat=${latitude}&lon=${longtitude}&radius=3000`
    axios({
      method : 'GET',
      headers : {
        "user-key" : ZomatoAPI
      }
    })
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
  }
}