import { readFile } from "node:fs/promises";
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatFileSize, validateReferenceImage } from "../src/upload-validation.js";

const image = (type = "image/png", size = 1024) => ({ type, size });

test("accepts supported image formats within the size limit", () => {
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    assert.equal(validateReferenceImage(image(type)), null);
  }
  assert.equal(validateReferenceImage(image("image/png", 10 * 1024 * 1024)), null);
});

test("rejects unsupported types, empty files, and files over 10 MB", () => {
  assert.match(validateReferenceImage(image("image/gif")), /Unsupported image format/);
  assert.match(validateReferenceImage(image("image/png", 0)), /empty/);
  assert.match(validateReferenceImage(image("image/png", 10 * 1024 * 1024 + 1)), /larger than 10 MB/);
  assert.match(validateReferenceImage(null), /Choose an image/);
});

test("formats selected file sizes for the preview", () => {
  assert.equal(formatFileSize(1024 * 1024), "1.00 MB");
});

test("all configured avatar prompt files are present and non-empty", async () => {
  const mapping = {
    "05_Profile_Picture.txt": "profile",
    "01_Working_Profile.txt": "working",
    "02_Daily_Update_Standard.txt": "daily",
    "03_Great_Job.txt": "great",
    "04_Problem_Report.txt": "problem",
    "06_Individual_PNG_and_Source_Gender.txt": "shared rules",
  };
  for (const [filename, label] of Object.entries(mapping)) {
    const content = await readFile(new URL(`../prompts/${filename}`, import.meta.url), "utf8");
    assert.ok(content.trim().length > 0, `${label} prompt should not be empty`);
  }
});
