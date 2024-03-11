#Instruction to run on local

NOTE: make sure you have node and mongodb installed

open two terminals let's say terminal1 and terminal2

terminal1: ```cd client``` -> ```yarn``` -> ```npm start```
terminal2: ```cd backend``` -> ```npm i``` -> ```cp .env.example .env``` -> In .env file give value to *JWT_SECRET*  -> ```npm run dev```


If the above steps are success:
view page at https://localhost:3000/
