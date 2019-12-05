"use strict";
console.log("here");
const nforce = require('nforce'),
      should= require('should'),
//         axios = require('axios'), 
      auth=require("./salesforce");
const  SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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";
   exports.execute = (req, res) => {
    console.log("Mein Hu IDHAR!");
    if (req.body.token != process.env.SLACK_VERIFICATION_TOKEN) {
          res.send("Invalid token");
          console.log("here1");
          return;
    }
   let userId= req.body.user_name;
  let params = req.body.text.split();
  let subject="Internal Ticket from:"+userId,
    description =params;
      
        console.log("params1");
     auth.casecreate(subject,description).then(data => {
       let resp=data;
       
          let fields = [];
         
         console.log('data',resp);
            fields.push({title: "Subject", value:subject , short:false});
            fields.push({title: "Description", value: description[0], short:false});
      fields.push({title: "Open in Salesforce:", value:"https://test.salesforce.com" + "/" +resp.get('id'), short:false});
          console.log('case',fields);
              let message = {
                text: "A new case has been created:",
                attachments: [
                    {color: "#F2CF5B", fields: fields}
                ]
            };
          console.log('message',message);
          res.send(message);
      

        })

                     
     
    
                         }
  
  
        