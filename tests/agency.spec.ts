import { site, whatsappUrl } from "../src/lib/content";
import { test, expect } from "@playwright/test";

test("full-screen entrance, wide stage and carousel navigation", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText(
    "Comienza un 2027 con tu sitio web",
  );
  const hero = await page.locator(".hero").boundingBox();
  expect(hero?.y).toBe(0);
  expect(hero!.height).toBeGreaterThanOrEqual(page.viewportSize()!.height);
  await expect(page.locator(".hero .project-preview")).toHaveCount(0);
  const stage = await page.locator(".project-stage").boundingBox();
  expect(stage!.width / page.viewportSize()!.width).toBeGreaterThanOrEqual(
    0.89,
  );
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await expect(page.getByRole("button", { name: "Cerrar demo" })).toBeFocused();
  await page.getByRole("button", { name: "colección", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Para cada momento." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Negocio siguiente" }).click();
  await expect(page.locator(".project-sector")).toHaveText("Medicina estética");
  await expect(page.getByRole("button", { name: "Cerrar demo" })).toHaveCount(
    0,
  );
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(page.locator(".preview-brand")).toHaveCount(0);
  await page.getByRole("button", { name: "Negocio siguiente" }).click();
  await expect(page.locator(".project-sector")).toHaveText("Floristería");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await page.getByRole("button", { name: "Cerrar demo" }).click();
  await expect(
    page.getByRole("button", { name: "Explorar sitio", exact: true }),
  ).toBeFocused();
  const caption = await page.locator(".project-caption").boundingBox();
  const statement = await page.locator(".showcase-statement").boundingBox();
  expect(statement!.y).toBeGreaterThan(caption!.y + caption!.height);
  await page.screenshot({
    path: `artifacts/${info.project.name}-full.png`,
    fullPage: true,
  });
});

test("medical header is the actual site before exploring", async ({ page }) => {
  await page.goto("/sectores/medicina-estetica");
  await expect(page.locator(".hero")).toHaveCount(0);
  await expect(page.locator(".project-sector")).toHaveText("Medicina estética");
  await expect(page).toHaveTitle(/medicina estética/);
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://mediesteticaintegral.vercel.app/",
  );
  await expect(page.locator("iframe")).toHaveAttribute("inert", "");
  await expect(page.frameLocator("iframe").locator("body")).toContainText(
    /Estética|estética/,
    { timeout: 30000 },
  );
  await expect(
    page.getByRole("link", { name: "Abrir sitio", exact: true }),
  ).toHaveAttribute("href", "https://mediesteticaintegral.vercel.app/");
  await page
    .getByRole("button", { name: "Explorar sitio", exact: true })
    .click();
  await expect(page.locator(".live-project")).toHaveClass(/is-interactive/);
  await expect(page.locator("iframe")).not.toHaveAttribute("inert", "");
  await expect(
    page.getByRole("link", { name: "Abrir aparte" }),
  ).toHaveAttribute("target", "_blank");
  await page.getByRole("button", { name: "Cerrar demo" }).click();
  await expect(page.locator(".live-project")).toHaveClass(/is-preview/);
  await expect(
    page.getByRole("button", { name: "Explorar sitio", exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.goto("/sectores/floristeria");
  await expect(page.locator(".project-sector")).toHaveText("Floristería");
  expect((await page.goto("/sectores/no-existe"))?.status()).toBe(404);
});

test("responsive navigation, reduced motion and exact WhatsApp destination", async ({
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
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  const contacts = page.locator('a[href*="wa.me"]');
  expect(await contacts.count()).toBeGreaterThanOrEqual(6);
  for (const link of await contacts.all()) {
    const url = new URL((await link.getAttribute("href"))!);
    expect(url.pathname).toBe("/50685090277");
    expect(url.searchParams.get("text")).toBe(
      "Hola, quiero cotizar mi sitio web",
    );
    await expect(link).toHaveAttribute("target", "_blank");
  }
  await expect(page.getByRole("link", { name: "Conversemos" })).toHaveCount(3);
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

test("WhatsApp default message and unconfigured number", () => {
  const original = site.whatsapp;
  try {
    site.whatsapp = "+506 8509-0277";
    const url = new URL(whatsappUrl()!);
    expect(url.pathname).toBe("/50685090277");
    expect(url.searchParams.get("text")).toBe(
      "Hola, quiero cotizar mi sitio web",
    );
    site.whatsapp = "";
    expect(whatsappUrl()).toBeNull();
    site.whatsapp = "por definir";
    expect(whatsappUrl()).toBeNull();
  } finally {
    site.whatsapp = original;
  }
});
