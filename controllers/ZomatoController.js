const axios = require('axios')

module.exports = {
  getData(req,res){
    const latitude = req.body.latitude
    const longtitude = req.body.longtitude
    const ZomatoAPI = process.env.ZOMATO
    const zomatoUrl = `https://developers.zomato.com/api/v2.1/geocode?lat=${latitude}&lon=${longtitude}`
    axios({
      method : 'GET',
      url : zomatoUrl,
      headers : {
        "user-key" : ZomatoAPI
      }
    })
      .then(response=>{
        console.log(response.data.nearby_restaurants.length)
        res.status(200).json({
          data : response.data.nearby_restaurants,
          message : 'success finding zomato data'
        })
      })
      .catch(error=>{
        // res.status(500).json({
        //   error
        // })
      })
  }
}