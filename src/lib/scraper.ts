import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium-min";

export async function getBrowser() {
  return await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });
}
