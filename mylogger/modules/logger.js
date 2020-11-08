   //exercise 2
   const fs = require("fs");

   const log = {
    info: function (msg) {
        console.log(msg);
    },
    write: function (msg) {
        fs.writeFile("logfile.txt", msg, function (err, data) {
            if (err) {
                console.log(`Failed to write data!: '${data}'`);

                return console.log(err);
            }
        });
    },
       //exercise 2
       append: function(msg) {
          fs.appendFile("logfile.txt",msg, function (err, data) { if (err) {
           console.log(`Failed to write data!: '${data}'`);
   
           return console.log(err);
       }  
   })
   }
   }
   
   let date = new Date();
   let currentDir =__dirname;
   let message = date.getDate + " - " + "This is a message 1 from file: " + currentDir;
   
   log.append(message);
   
   exports.logger = log;
   
   
   
   
