# imagine-api
image generate api

# Image Generation API Server

This repository contains example code for a server that collects data from an EEG device, analyzes the data to classify emotions, and generates images based on these emotions using various image generation APIs.

## Used API Models

- OpenAI Dalle
- Midjourney
- Stable Diffusion (Deforum)

## API Specifications

- `additional_prompt`: Text data related to emotions obtained from the observer
- `select_number`: Numbering to select a pre-prepared prompt based on the scent experienced
- `img_url`: Image URL used for requests such as variation, upscaling, or animation

## API URLs

```bash
/midjourney/imagine       # Generate image
/midjourney/varition      # Transform image
/midjourney/upscale       # Upscale image
/dalle/imagine            # Generate image
/dalle/varition           # Transform image
/deforum/interpolation    # Animate image
```

## API Costs

- Midjourney: Approximately $0.05 per execution (1 image)
- OpenAI: Approximately $0.04 per execution (1 image)
- Replicate: Approximately $0.63 per execution (1 video)

## Example API Request

### Midjourney Image Generation

```bash
curl -X POST http://localhost:3000/midjourney/imagine \
     -H "Content-Type: application/json" \
     -d '{
           "additional_prompt": "With a touch of mystery and magic,",
           "prompt_select": 1
         }'
```

### Request JSON Example

```json
{
    "additional_prompt": "With a touch of mystery and magic,",
    "prompt_select": 1
}
```

## Project Structure

```
.
├── src
│   ├── controllers
│   │   ├── midjourneyController.js
│   │   ├── dalleController.js
│   │   └── deforumController.js
│   ├── services
│   │   ├── midjourneyService.js
│   │   ├── dalleService.js
│   │   └── deforumService.js
│   ├── routes
│   │   ├── midjourneyRoutes.js
│   │   ├── dalleRoutes.js
│   │   └── deforumRoutes.js
│   └── app.js
├── package.json
└── README.md
```

## Installation and Execution

1. Clone the repository.

```bash
git clone https://github.com/yourusername/image-generation-api.git
cd image-generation-api
```

2. Install dependencies.

```bash
npm install
```

3. Start the server.

```bash
npm start
```

## Technologies Used

- Node.js
- Express.js

---
This document provides an overview of the project setup, technologies used, API specifications, cost information, and example requests. For more details, refer to the code or create additional documentation as needed.