const express = require('express');
const fs = require('fs');
const path = require('path');
// const { Configuration, OpenAIApi } = require('openai');
const OpenAI = require('openai');

const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 프롬프트 파일 읽기
const prompts = JSON.parse(fs.readFileSync(path.join(__dirname, 'prompts.json'), 'utf-8')).prompts;

// Imagine 엔드포인트
router.post('/imagine', async (req, res) => {
  const { additional_prompt, prompt_select } = req.body;

  try {
    if (!additional_prompt || prompt_select === undefined || prompt_select < 0 || prompt_select >= prompts.length) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const prompt = `${additional_prompt}, ${prompts[prompt_select]}`;
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    if (!response || !response.data) {
      return res.status(500).json({ message: 'Image generation request failed' });
    }

    const imageUrl = response.data[0].url;
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/variation', async (req, res) => {
  const { img_url } = req.body;

  try {
    const response = await openai.images.createVariation({
      model: "dall-e-2",
      image: fs.createReadStream(img_url),
      n: 1,
      size: "1024x1024"
    });

    if (!response || !response.data) {
      return res.status(500).json({ message: 'Image variation request failed' });
    }

    const image_url = response.data[0].url;
    res.json({ image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
