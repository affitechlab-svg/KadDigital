import { expect, test } from "@playwright/test";

test("laman utama berjaya dimuat (ujian asap Fasa 0)", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("KadDigital")).toBeVisible();
});
