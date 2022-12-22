import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
I want you to act as a financial advisor. I will provide some details about my current situation and goals, and it will be your job to come up with strategies that can help me make a better decision and reach those objectives. This could involve offering advice and various topics such as creating plans for achieving success or dealing with difficult emotions. Write an personalized email with friendly tone based on the details.
g
`

const generateAction = async (req, res) => {
  // Run first prompt
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 700,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;