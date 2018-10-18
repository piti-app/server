const mongoose = require('mongoose')

const schema = new mongoose.Schema({
   name: "string",
   url: "string",
   locality: "string",
   address: "string",
   average_cost_for_two: "number",
   cuisines: "string",
   rating: "number",
   thumb : 'string',
   image : "string"
}, {
   timestamps: true
});

module.exports = mongoose.model('Zomato', schema);

// {
//   "restaurant": {
//     "R": {
//       "res_id": 7423477
//     },
//     "apikey": "43ba0f8146136e318177d15edc3dc24f",
//     "id": "7423477",
//     "name": "Makaroni Ngehe",
//     "url": "https://www.zomato.com/jakarta/makaroni-ngehe-pondok-indah?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
//     "location": {
//       "address": "Jl. Sultan Iskandar Muda, Pondok Indah, Jakarta",
//       "locality": "Pondok Indah",
//       "city": "Jakarta",
//       "city_id": 74,
//       "latitude": "-6.2531576034",
//       "longitude": "106.7817932367",
//       "zipcode": "",
//       "country_id": 94,
//       "locality_verbose": "Pondok Indah, Jakarta"
//     },
//     "switch_to_order_menu": 0,
//     "cuisines": "Street Food",
//     "average_cost_for_two": 20000,
//     "price_range": 1,
//     "currency": "IDR",
//     "offers": [],
//     "opentable_support": 0,
//     "is_zomato_book_res": 0,
//     "mezzo_provider": "OTHER",
//     "is_book_form_web_view": 0,
//     "book_form_web_view_url": "",
//     "book_again_url": "",
//     "thumb": "https://b.zmtcdn.com/data/reviews_photos/3d1/6a75e4492e3403862552067d2f29e3d1_1505828019.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
//     "user_rating": {
//       "aggregate_rating": "3.7",
//       "rating_text": "Good",
//       "rating_color": "9ACD32",
//       "votes": "165"
//     },
//     "photos_url": "https://www.zomato.com/jakarta/makaroni-ngehe-pondok-indah/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
//     "menu_url": "https://www.zomato.com/jakarta/makaroni-ngehe-pondok-indah/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
//     "featured_image": "https://b.zmtcdn.com/data/reviews_photos/3d1/6a75e4492e3403862552067d2f29e3d1_1505828019.jpg",
//     "has_online_delivery": 0,
//     "is_delivering_now": 0,
//     "include_bogo_offers": true,
//     "deeplink": "zomato://restaurant/7423477",
//     "is_table_reservation_supported": 0,
//     "has_table_booking": 0,
//     "events_url": "https://www.zomato.com/jakarta/makaroni-ngehe-pondok-indah/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
//     "establishment_types": []
//   }
// },