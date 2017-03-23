var fs = require('fs');

exports.debug = (data, status, date)=>{
  // This is the variable for timestamp
  var time = new Date() + '\n';

  // these are colour variables (RGB)
  var red = '\x1B[31m';
  var green = '\x1b[32m';
  var blue = '\x1b[34m';

  if(status !== "woot, woot success!") {

  var data = blue + time + red + status + data;

  }else{

     data = blue + time + data + ': ' + green + status;
  }

  if(process.env.DEBUG === "true"){
    // This creates the dreaded but useful log file
    fs.appendFile('./logs/debug.log', data, (err) =>{
      if(err){
        return console.log(err);
      }

    });
    console.log(data);
  }

};
