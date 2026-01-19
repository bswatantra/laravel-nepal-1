import puppeteer from "puppeteer";

export async function getBrowser() {
  return await puppeteer.launch();
}
