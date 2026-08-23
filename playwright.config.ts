import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

// Sandbox pembangunan boleh sediakan Chromium pra-pasang pada laluan tetap
// (env PLAYWRIGHT_EXECUTABLE_PATH) bila versi pakej tidak sepadan dengan
// yang dimuat turun automatik. Pada mesin lain, biar Playwright guna
// browser piawainya sendiri.
const executablePath =
  process.env.PLAYWRIGHT_EXECUTABLE_PATH &&
  existsSync(process.env.PLAYWRIGHT_EXECUTABLE_PATH)
    ? process.env.PLAYWRIGHT_EXECUTABLE_PATH
    : undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  use: {
    baseURL: "http://localhost:3000",
    launchOptions: executablePath ? { executablePath } : {},
  },
});
