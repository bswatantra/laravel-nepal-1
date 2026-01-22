import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import packageJson from "../../package.json";

const chromiumVersion =
  packageJson.dependencies["@sparticuz/chromium"]?.replace(/^[\^~]/, "") ||
  "143.0.4";
export async function getBrowser() {
  return await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v${chromiumVersion}/chromium-v${chromiumVersion}-pack.x64.tar`,
    ),
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 800,
    },
  });
}
