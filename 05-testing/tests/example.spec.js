// @ts-check
import { test, expect } from "@playwright/test";

// 1. lo mas recomendado es usa Roles, aria
// 2. etiquetas de texto, placeholders, nombres
// 3. data-testid
// 4. selectores de CSS, clases, ids
test("Buscar empleos y aplicar a una oferta", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const searchInput = page.getByRole("Searchbox");
  await searchInput.fill("React");

  await page.getByRole("button", { name: "Buscar" }).click();

  const jobCards = page.locator(".job-listing");

  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.locator("h4").first();
  await expect(firstJobTitle).toHaveText("Desarrollador de Software Senior");

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

  page.getByRole("Button", { name: "Aplicado"}).first()
});
