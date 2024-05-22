const express = require("express");
const fs = require("fs");
const path = require("path");
const Replicate = require("replicate");

const router = express.Router();

// 프롬프트 파일 읽기
const prompts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "prompts.json"), "utf-8")
).prompts;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

router.post("/interpolation", async (req, res) => {
  const { additional_prompt, prompt_select, img_url } = req.body;

  try {
    const prompt = `${additional_prompt}, ${prompts[prompt_select]}`;

    const input = {
      fov: 40,
      fps: 15,
      zoom: "0:(1.04)",
      angle: "0:(0)",
      width: 512,
      border: "replicate",
      height: 512,
      sampler: "euler_ancestral",
      clip_name: "ViT-L/14",
      far_plane: 10000,
      max_frames: 200,
      near_plane: 200,
      midas_weight: 0.3,
      padding_mode: "border",
      rotation_3d_x: "0:(0)",
      rotation_3d_y: "0:(0)",
      rotation_3d_z: "0:(0)",
      sampling_mode: "bicubic",
      translation_x: "0:(10*sin(2*3.14*t/10))",
      translation_y: "0:(0)",
      translation_z: "0:(10)",
      animation_mode: "2D",
      guidance_scale: 7,
      noise_schedule: "0: (0.02)",
      sigma_schedule: "0: (1.0)",
      amount_schedule: "0: (0.2)",
      color_coherence: "Match Frame 0 LAB",
      kernel_schedule: "0: (5)",
      model_checkpoint: "Protogen_V2.2.ckpt",
      animation_prompts: prompt,
      contrast_schedule: "0: (1.0)",
      diffusion_cadence: "1",
      extract_nth_frame: 1,
      resume_timestring: "20220829210106",
      strength_schedule: "0: (0.65)",
      use_depth_warping: true,
      threshold_schedule: "0: (0.0)",
      hybrid_video_motion: "None",
      num_inference_steps: 50,
      perspective_flip_fv: "0:(53)",
      interpolate_x_frames: 4,
      perspective_flip_phi: "0:(t%15)",
      perspective_flip_gamma: "0:(0)",
      perspective_flip_theta: "0:(0)",
      hybrid_video_flow_method: "Farneback",
      overwrite_extracted_frames: true,
      hybrid_video_comp_mask_type: "None",
      hybrid_video_comp_mask_equalize: "None",
      hybrid_video_comp_alpha_schedule: "0:(1)",
      color_coherence_video_every_N_frames: 1,
      hybrid_video_comp_mask_contrast_schedule: "0:(1)",
      hybrid_video_use_first_frame_as_init_image: true,
      hybrid_video_comp_mask_blend_alpha_schedule: "0:(0.5)",
      hybrid_video_comp_mask_auto_contrast_cutoff_low_schedule: "0:(0)",
      hybrid_video_comp_mask_auto_contrast_cutoff_high_schedule: "0:(100)",
      init_image: img_url,
    };

    const output = await replicate.run(
      "deforum-art/deforum-stable-diffusion:1a98303504c7d866d2b198bae0b03237eab82edc1491a5306895d12b0021d6f6",
      { input }
    );

    if (!output) {
      return res.status(500).json({ message: "interpolation request failed" });
    }

    const interpolationUrl = output;
    res.json({ interpolationUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
