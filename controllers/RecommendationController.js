const axios = require('axios')
const baseURL = `http://localhost:4000`

module.exports = {
  getRecommendation : (req,res) =>{
    const id = req.body.id
    const moneyLeft = Number(req.body.main_balance) - Number(req.body.money_spent) - Number(req.body.budget)
    const today = new Date()
    let day = today.getDate()
    let daysLeft = 30 - day
    let budgetPerMeal = Math.floor(moneyLeft/(daysLeft*3))
    axios({
      method : "POST",
      data : {
        latitude : req.body.latitude,
        longtitude : req.body.longtitude
      },
      url : `${baseURL}/zomato`
    })
      .then(response =>{
        const arrayResult = response.data.data
        const finalArray = []
        arrayResult.forEach(restaurant => {
          if(restaurant.restaurant.average_cost_for_two/2 <= budgetPerMeal){
            finalArray.push(restaurant)
          }
        });

        res.status(200).json({
          message : 'success getting recommendations',
          data : finalArray,
          budgetPerMeal : budgetPerMeal
        })

      })
      .catch(error=>{
        res.status(500).json({
          error
        })
      })
  }
}