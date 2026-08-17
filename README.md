# Speak Better Than AI?

A private, browser-based pronunciation game: grade an AI voice, take your turn, and see who says the sentence better.

PocketTTS generates the reference voice, then the same Wav2Vec2 phoneme model grades both the AI and the player. Recorded audio never leaves the browser.

## Features

- AI-versus-you pronunciation game
- 29 guided drills sorted by difficulty
- Famous tongue twisters and targeted English sound contrasts
- Custom challenges with shareable `?challenge=` URLs
- Automatic end-of-speech detection
- Word-level pronunciation feedback
- Local speech synthesis and phoneme recognition
- Responsive light and dark modes
- Worker-based inference that keeps the interface responsive

## How it works

1. Pick a sample sentence or enter your own.
2. **Grade AI** synthesizes and grades the completed reference audio.
3. **My Turn** records until silence is detected, then grades the completed recording.
4. Expected and recognized phonemes are aligned into a score and word-level color feedback.

The first run downloads and caches the speech models, so it can take noticeably longer than later runs.

## Run locally

Use a current Node.js release:

```bash
npm install
npm run dev
```

Open the URL printed by Vite and allow microphone access when prompted.

Create and preview a production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This repository includes an automatic Pages workflow.

1. Open **Settings → Pages** in the GitHub repository.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Push to `main`, or manually run **Deploy to GitHub Pages** from the Actions tab.

The published app will be available at:

<https://ldenoue.github.io/speak-better-than-ai/>

Vite uses relative asset paths, so the same build can also run on a custom domain.

## Technology

- [Vite](https://vite.dev/)
- [Transformers.js](https://huggingface.co/docs/transformers.js/)
- [ONNX Runtime Web](https://onnxruntime.ai/docs/tutorials/web/)
- [PocketTTS](https://github.com/kyutai-labs/pocket-tts)
- [eSpeak NG](https://github.com/espeak-ng/espeak-ng)
- [Wav2Vec2 phoneme model](https://huggingface.co/onnx-community/wav2vec2-lv-60-espeak-cv-ft-ONNX)

## Privacy

Microphone recordings, decoded audio, phoneme alignment, and inference stay in the current browser tab. The app downloads model assets but does not upload recorded audio.

## Browser support

A modern Chromium-based browser is recommended. Microphone access requires HTTPS in production; GitHub Pages provides it automatically.

## Contributing

Issues and pull requests are welcome. Particularly useful contributions include better pronunciation drills, accessibility improvements, browser compatibility fixes, and more robust phoneme-to-word alignment.

## License

[MIT](LICENSE)
