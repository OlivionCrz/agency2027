import { test, expect } from "@playwright/test";

test("hero, sector carousel, demo navigation and close", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "Comienza un 2027 con tu sitio web",
  );
  await expect(page.locator(".hero .project-preview")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "Cerrar demo" })).toBeFocused();
  await page.getByRole("button", { name: "colección", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Para cada momento." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "nosotros", exact: true }).click();
  await expect(
    page.getByText("Flora es una marca ficticia", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Negocio siguiente" }).click();
  await expect(page.locator(".project-sector")).toHaveText("Medicina estética");
  await expect(page.getByRole("button", { name: "Cerrar demo" })).toHaveCount(
    0,
  );
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.getByRole("button", { name: "Negocio siguiente" }).click();
  await expect(page.locator(".project-sector")).toHaveText("Floristería");
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await page.getByRole("button", { name: "Cerrar demo" }).click();
  await expect(
    page.getByRole("button", { name: "Explorar sitio", exact: true }),
  ).toBeFocused();
  await page.screenshot({
    path: `artifacts/${info.project.name}-full.png`,
    fullPage: true,
  });
});

test("direct sector URLs and live medical embed", async ({ page }) => {
  await page.goto("/sectores/medicina-estetica");
  await expect(page.locator(".hero")).toHaveCount(0);
  await expect(page.locator(".project-sector")).toHaveText("Medicina estética");
  await expect(page).toHaveTitle(/medicina estética/);
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://mediesteticaintegral.vercel.app/",
  );
  await expect(
    page.getByRole("link", { name: "Abrir aparte" }),
  ).toHaveAttribute("target", "_blank");
  const frame = page.frameLocator("iframe");
  await expect(frame.locator("body")).toContainText(/Estética|estética/, {
    timeout: 30000,
  });
  await page.getByRole("button", { name: "Cerrar demo" }).click();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.goto("/sectores/floristeria");
  await expect(page.locator(".project-sector")).toHaveText("Floristería");
  const response = await page.goto("/sectores/no-existe");
  expect(response?.status()).toBe(404);
});

test("responsive layout, missing WhatsApp and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator(".hero-grid")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
  await page.locator(".floating-contact").click();
  await expect(page).toHaveURL(/#contacto$/);
  await expect(
    page.getByText("Estamos preparando nuestro canal de contacto."),
  ).toBeVisible();
  if (await page.getByRole("button", { name: "Abrir menú" }).isVisible()) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page
      .getByRole("navigation", { name: "Navegación principal" })
      .getByRole("link", { name: "Planes" })
      .click();
    await expect(
      page.getByRole("button", { name: "Abrir menú" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
});

test("metadata, sitemap and robots", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "/sectores/medicina-estetica",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "sitemap.xml",
  );
});
