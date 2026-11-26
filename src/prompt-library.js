export const AVATARS = Object.freeze({
  profile: { label: "Profile Picture", file: "05_Profile_Picture.txt" },
  working: { label: "Working Profile", file: "01_Working_Profile.txt" },
  daily: { label: "Daily Update Standard", file: "02_Daily_Update_Standard.txt" },
  great: { label: "Great Job", file: "03_Great_Job.txt" },
  problem: { label: "Problem Report", file: "04_Problem_Report.txt" },
});

async function fetchPrompt(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path} (${response.status})`);
  return response.text();
}

export async function loadAvatarPrompt(avatarId) {
  const avatar = AVATARS[avatarId];
  if (!avatar) throw new Error(`Unknown avatar type: ${avatarId}`);
  const [avatarPrompt, sharedPrompt] = await Promise.all([
    fetchPrompt(`prompts/${avatar.file}`),
    fetchPrompt("prompts/06_Individual_PNG_and_Source_Gender.txt"),
  ]);
  return {
    avatarPrompt,
    sharedPrompt,
    completePrompt: `${avatarPrompt.replace(/\s+$/, "")}\n\n${sharedPrompt}`,
  };
}
