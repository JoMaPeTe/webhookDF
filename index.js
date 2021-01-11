const express = require ('express')
const app = express()
const {WebhookClient} = require('dialogflow-fulfillment');

app.get('/', function (req,res){
    res.send('Hello World')
})

/************* */

app.post('/webhook', express.json(), function (req,res){
    const agent = new WebhookClient({ request:req, response:res });
  console.log('Dialogflow Request headers: ' + JSON.stringify(req.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

   function ReservarActividad(agent) {
    let parametrosReserva = agent.parameters;
    console.log(parametrosReserva);
    console.log(parametrosReserva.actividad[0]);
    // if(actividad.actividad1=='tenis'){
    //     agent.context.set({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});   
    // }
    agent.add(`Su webhook le ha reservado ${parametrosReserva.actividad[0]} `);
    
    // agent.add(new Card({
     //    title: `Title: this is a card title`,
      //   imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
     //    text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
     //    buttonText: 'This is a button',
     //    buttonUrl: 'https://assistant.google.com/'
     //  })
    //);
    // agent.add(new Suggestion(`Quick Reply`));
    // agent.add(new Suggestion(`Suggestion`));
     
   }

  // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('ReservarActividad', ReservarActividad);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
})



app.listen(3000, ()=>{
    console.log("Ejecutando servidor en puerto 3000")
}
)