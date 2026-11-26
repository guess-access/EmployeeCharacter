# EmployeeCharacter

Prime Kreatives avatar prompt library and lightweight, responsive browser-based prompt studio.

## Run locally

Requires Python 3 for the static development server and Node.js 18+ to run the test suite. No npm dependencies are required.

```sh
npm start
```

Open <http://localhost:4173>. Select a reference image (JPG, PNG, or WEBP, up to 10 MB) to preview it locally, then choose one of the five avatar types. The page loads the selected prompt directly from `prompts/` and also loads the shared individual-PNG and source-identity rules. Copy either the complete prompt or the avatar-specific prompt.

Run checks with:

```sh
npm test
```

## Privacy and image handling

The interface validates the file's declared MIME type and size, then previews it using a browser object URL. It does not upload the image, persist it, or send it to a provider. The preview URL is revoked when the image is removed or the page is closed. Do not commit reference photos or private generated avatars.

Each generated avatar should be a separate square PNG request; never combine poses or characters into a collage. The shared rules in `prompts/06_Individual_PNG_and_Source_Gender.txt` are included with the selected prompt when using **Copy complete prompt**.

## Image-generation provider

No provider or server integration is configured, so this app intentionally does not generate or fabricate images. To add generation later, configure a trusted provider through a server-side endpoint, keep credentials in server-side environment variables or a secret manager, validate requests and uploads on the server, and return one image per request for user review. Never put provider keys in browser code or static assets. After provider credentials and an approved server configuration are available, document the required server environment variables and add provider-specific setup here.
