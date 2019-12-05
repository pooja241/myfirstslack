"use strict";
console.log("here");
const nforce = require('nforce'),
      should= require('should'),
  _case = require("./case"),    
    SLACK_VERIFICATION_TOKEN =  process.env.SLACK_VERIFICATION_TOKEN,
    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    // 
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    // 
    SF_USER_NAME = process.env.SF_USER_NAME,
    //
    SF_PASSWORD = process.env.SF_PASSWORD;

    let org = nforce.createConnection({
      clientId: SF_CLIENT_ID,
      clientSecret: SF_CLIENT_SECRET,
      redirectUri: 'https://localhost:3000/oauth/_callback',
      mode:'single',
      environment: 'sandbox',
      autoRefresh: true
    },
                                      {
       instanceUrl: 'https://strivr--cypresssb.lightning.force.com',                               
    });

    let login = () => {

    org.authenticate({ username: SF_USER_NAME, password: SF_PASSWORD }, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
          var uri = org.getAuthUri();
         uri.should.match(/^https:\/\/test.salesforce.*/);
          console.log('uri',uri);
         //console.log('uri',instanceUrl);
            console.log("Authentication successful");
        }
    });

};
    let casecreate =(subject,description)=>{
      console.log('subject1',subject);
      console.log('desc',description[0]);
      console.log();
  return new Promise((resolve, reject) => {
     let c = nforce.createSObject('Case');
        c.set('subject',subject);
        c.set('description',description[0]);
          c.set('origin', 'Slack');
        c.set('status', 'New');
         c.set('priority','Medium')
      //c.set('ownerId', '0050o00000WNkciAAD');
        console.log('hy1');
        org.insert({sobject:c}, err => {
            if (err) {
                console.error(err);
                reject("An error occurred while creating a case");
            } else {
                resolve(c);
            }
        });
  })
    }
 login();
setInterval(login,2800000);
//setInterval(org,50000000);
exports.org = org;
exports.casecreate = casecreate;    