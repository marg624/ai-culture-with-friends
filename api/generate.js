import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const thing = req.body.thing || '';
  const promptType = req.body.type || 'metaphor';
  if (thing.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter an emotion",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(thing, promptType),
      temperature: 0.6,
    });
    console.log(completion.data)
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(thing, type) {
  const capitalizedThing =
    thing[0].toUpperCase() + thing.slice(1).toLowerCase();
  return (type === 'metaphor' ? generatePromptMetaphor(capitalizedThing) : generatePromptAbout(capitalizedThing) );
}

function generatePromptMetaphor(capitalizedThing) {
  return `Suggest lines for a bridesmaid speech that creates a metphor for love using the input.

Metaphor: Wine
Lines: Love is like a fine wine, it ages with time.
Metaphor: Fire
Lines: Love is a fire. It burns everyone. It disfigures everyone. It is the world’s excuse for being ugly.
Metaphor: ${capitalizedThing}
Lines:`;
}

function generatePromptAbout(capitalizedThing) {
  return `Suggest pun about love for a bridesmaid speech that is about the thing.

Thing: Can't
Pun: I cannoli be happy when I'm with you.
Thing: Do not
Pun: Donut ever let me go.
Thing: Express
Pun: Words can not espresso how much you mean to me.
Thing: I will
Pun: Owl always love you.
Thing: ${capitalizedThing}
Pun:`;
}
