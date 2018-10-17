const axios = require('axios')

module.exports = {
  getData(req,res){
    const ZomatoAPI = process.env.ZOMATO
    const zomatoUrl = `https://developers.zomato.com/api/v2.1/search?count=10&lat=-6.254590&lon=106.757190&radius=3000`
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