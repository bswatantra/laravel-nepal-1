import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

export async function getBrowser() {
  return await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar",
    ),
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });
}
