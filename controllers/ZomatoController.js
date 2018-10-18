const axios = require('axios')

module.exports = {
  getData(req,res){
    const latitude = req.body.latitude
    const longtitude = req.body.longtitude
    const ZomatoAPI = process.env.ZOMATO
    const zomatoUrl = `https://developers.zomato.com/api/v2.1/search?entity_type=subzone&q=pondok%20indah&lat=${latitude}&lon=${longtitude}&radius=1000`
    axios({
      method : 'GET',
      url : zomatoUrl,
      headers : {
        "user-key" : ZomatoAPI
      }
    })
      .then(response=>{
        res.status(200).json({
          data : response.data.restaurants,
          message : 'success finding zomato data'
        })
      })
      .catch(error=>{
        res.status(500).json({
          error
        })
      })
  }
}