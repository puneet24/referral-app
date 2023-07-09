** Referral App **

* Steps to Run App locally *
 Prerequisites:
 - SQL server running locally in system
 - You will need SMPT setting for sending mail (Please configure accordingly in development.rb)
 - For frontend Application node should be installed

 Steps to run locally:
 - Open terminal & chdir to referral-app
 - Execute `bin/setup`
 - Execute `bin/dev`
 - You can access front-end Application on 'http://localhost:3000' & 'http://localhost:3001'

* Alternative way of running Application locally, if SQL is not present *
 Prerequisites:
 - Docker should be installed
 
 Steps to run locally:
 - Execute `docker compose up`
