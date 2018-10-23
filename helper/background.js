const kue = require('kue')
  , queue = kue.createQueue()  
const CronJob = require('cron').CronJob
const User = require('../models/user.js')
kue.app.listen(3001)
var today = new Date();    
    var mnt = today.getMinutes() + 1
    var hours = today.getHours()
    var dd = today.getDate();
    var mm = today.getMonth();
   
var schedule = `${mnt} ${hours} ${dd} ${mm} *` 
new CronJob(schedule, function() {
  let job = queue.process('usersaving', (job, done) => {
    console.log(job.data.user,'====<cok')
    let id = job.data.user._id
    User.findOne({
        _id :id
    })
        .then((result) => {
            console.log('=====>',result)
        }).catch((err) => {
            console.log(err)
        });
  })
}, null, true, 'Asia/Jakarta');
