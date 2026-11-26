# Prompt Library Manifest

- Brand: Prime Kreatives
- Package version: 2.1
- Purpose: consistent 3D CGI avatar prompts based on uploaded reference photos
- Identity handling: derive visible identity traits from the uploaded photo; use gender-neutral prompt wording unless specifying the reference's visible gender presentation
- Required image set: Profile Picture, Working Profile (seated with open laptop), Daily Update Standard, Great Job, Problem Report
- Working Profile is mandatory and must show the character seated in a modern white swivel chair using an open laptop
- Output target: an individual square PNG for each avatar; never combine characters or avatar poses into a collage or multi-panel image
- Shared generation rules: apply `prompts/06_Individual_PNG_and_Source_Gender.txt` together with the selected avatar prompt for every generation request
- Integration guide: `GITHUB_INTEGRATION_PROMPT.md`
