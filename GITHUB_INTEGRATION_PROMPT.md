# GitHub Integration Prompt — Prime Kreatives Avatar Prompt Library

You are working inside the existing EmployeeCharacter repository. First inspect the repository's actual framework, architecture, existing UI, upload flow, storage, and image-generation capabilities. Do not assume a framework or replace existing functionality.

## Before editing
1. Inspect the repository tree, README, package/config files, current profile/avatar components, upload handling, storage, and any image-generation integration.
2. Identify the best location for the prompt files. Avoid duplicates.
3. Report the relevant files, current capabilities, gaps, and a proposed implementation plan.
4. Do not edit until the user approves the plan.

## Required avatar types
- Profile Picture — half-body portrait with arms crossed.
- Working Profile — REQUIRED: seated in a modern white swivel chair, actively using an open laptop; full chair, base and wheels visible.
- Daily Update Standard — one hand at chin in a thinking gesture, other hand thumbs-up.
- Great Job — both fists raised, both feet on the ground; no jumping.
- Problem Report — one open palm toward viewer, other index finger near temple.

Load each prompt from the corresponding text file in the prompts folder. Do not rewrite or substitute pose requirements.

## Desired workflow
- User uploads a reference photo and previews it.
- User selects one of the five avatar types.
- App displays the matching prompt and allows copying it.
- If an image-generation provider is already configured, use the existing secure server-side integration to generate one image per request.
- User reviews the result before saving or assigning it to a profile.
- If no provider is configured, implement a functional prompt-copy workflow and document the missing provider configuration. Do not fake image generation.

## Identity and output requirements
- Uploaded photo is the source of truth for the person's visible identity.
- Work with male and female reference photos; never hardcode gender, hairstyle, facial hair, glasses, skin tone, or body build.
- Keep the same recognizable person, outfit, visual style, and logo across all five images.
- Target square PNG with genuine alpha transparency where supported. Never claim transparency if the provider returns an opaque background.
- Generate one image per request, never a collage.

## Security and privacy
- Never expose API keys, GitHub tokens, or provider secrets in client code.
- Validate upload type and size using existing project conventions.
- Do not commit reference photos, private generated avatars, credentials, or personal data.
- Handle loading, errors, cancellation, and unsupported formats.
- Preserve accessibility and responsive behavior.

## Git workflow and scope
- Use a feature branch. Do not commit directly to the default branch.
- Do not change unrelated pages, authentication, routes, styling, or business logic.
- Reuse existing architecture and dependencies; justify any new dependency.
- After approved implementation, run existing tests, lint, type checks, and build commands.
- Report changed files and checks. Do not merge, deploy, push to production, or change repository settings without explicit approval.

Begin with repository inspection and a proposed plan only. Do not edit application code until approved.
