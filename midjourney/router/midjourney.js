const express = require('express');
const fs = require('fs');
const path = require('path');
const { Midjourney } = require('freezer-midjourney-api');

const router = express.Router();

const prompts = JSON.parse(fs.readFileSync(path.join(__dirname, 'prompts.json'), 'utf-8')).prompts;

const config = {
  ServerId: process.env.SERVER_ID,
  ChannelId: process.env.CHANNEL_ID,
  SalaiToken: process.env.SALAI_TOKEN,
  Debug: true,
  Ws: true,
  SessionId: process.env.SALAI_TOKEN || "8bb7f5b79c7a49f7d0824ab4b8773a81",
  DiscordBaseUrl: "https://discord.com",
};

const client = new Midjourney(config);

client.init().catch(err => {
  console.error('Failed to initialize Midjourney client:', err);
});

// Imagine endpoint
router.post('/imagine', async (req, res) => {
  const { additional_prompt, prompt_select } = req.body;
  try {
    if (!additional_prompt || prompt_select === undefined || prompt_select < 0 || prompt_select >= prompts.length) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const prompt = `${additional_prompt}, ${prompts[prompt_select]}`;
    const Imagine = await client.Imagine(prompt, (uri, progress) => {
      console.log('loading', uri, 'progress', progress);
    });

    if (!Imagine) {
      return res.status(500).json({ message: 'Imagine request failed' });
    }

    res.json(Imagine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// Variation endpoint
router.post('/varition', async (req, res) => {
  const { msgId, flags, customId, content } = req.body;
  try {
    const Varition = await client.Custom({
      msgId,
      flags,
      customId,
      content,
      loading: (uri, progress) => {
        console.log('loading', uri, 'progress', progress);
      },
    });
    res.json(Varition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Upscale endpoint
router.post('/upscale', async (req, res) => {
  const { msgId, flags, customId } = req.body;
  try {
    const Upscale = await client.Custom({
      msgId,
      flags,
      customId,
      loading: (uri, progress) => {
        console.log('loading', uri, 'progress', progress);
      },
    });
    res.json(Upscale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Custom Zoom endpoint
router.post('/customZoom', async (req, res) => {
  const { msgId, flags, customId, content } = req.body;
  try {
    const CustomZoomout = await client.Custom({
      msgId,
      flags,
      content: `${content} --zoom 2`, // Custom Zoom requires content with zoom
      customId,
      loading: (uri, progress) => {
        console.log('loading', uri, 'progress', progress);
      },
    });
    res.json(CustomZoomout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
