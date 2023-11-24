const bookrecs = require("../models/bookrecs");
//const openai = require('openai');


const { Configuration, OpenAIApi } = require("openai")
async function testChat(){
    const newConfig = new Configuration({ 
        apiKey: process.env.CHATGPT_KEY 
      }); 
      const openai = new OpenAIApi(newConfig);
      const GPTOutput = await openai.createChatCompletion({ 
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: 'hello' }], 
      }); 
  
      const output_text = GPTOutput.data.choices[0].message.content; 
      console.log(output_text); 
}
testChat()



module.exports = {
    getBookRecs: (req, res) => {
        res.render("bookrecs.ejs");
    },
    getResponse: async (req, res) => {
        try {
          const inputText = req.body.input;
          const parentDiv = req.body.parentDiv;
    
          if (!inputText) {
            return res.status(400).json({ error: 'Input is empty' });
          }
    
          const question = { content: inputText };
    
          // Assuming your API endpoint is '/postbookrecs' (replace it with the correct endpoint)
          const response = await fetch('/postbookrecs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
          });
    
          const data = await response.json();
    
          if (data.message) {
            const answer = { content: data.message };
    
            // Save the question and answer to MongoDB
            const bookrec = new Bookrec({
              question: inputText,
              response: data.message,
              user: req.user._id, // Assuming you have a user object in your request
            });
    
            await bookrec.save();
    
            // Fetch all bookrecs from MongoDB and pass them to the EJS template
            const bookrecs = await Bookrec.find({ user: req.user._id });
            
            // Render the EJS template with the bookrecs data
            res.render('/bookrecs', { bookrecs });
          } else {
            res.status(200).json({ success: true });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
    };



