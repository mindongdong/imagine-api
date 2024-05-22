const express = require("express");
const fs = require("fs");
const path = require("path");
const Replicate = require("replicate");

const router = express.Router();

// 프롬프트 파일 읽기
const prompts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "prompts.json"), "utf-8")
).prompts;

const replicate = new Replicate();

router.post("/interpolation", async (req, res) => {
  const { img_url } = req.body;

  try {
    const input = {
        resume_timestring: "20220829210106",
        init_image: img_url
    };

    const output = await replicate.run("deforum-art/deforum-stable-diffusion:1a98303504c7d866d2b198bae0b03237eab82edc1491a5306895d12b0021d6f6", { input });

    if (!output) {
      return res
        .status(500)
        .json({ message: "interpolation request failed" });
    }

    const interpolationUrl = output
    res.json({ interpolationUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
