import { NextRequest, NextResponse } from "next/server";
import { getBrowser } from "@/lib/scraper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const pageNumber = searchParams.get("page") || "1";

  const targetUrl = `https://laravelmagazine.com/articles?page=${pageNumber}`;

  let browser;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    const articleSectionContainer = await page.$("div.grid.grid-cols-1");

    if (!articleSectionContainer) {
      console.error("Article section container not found on the page.");
      return NextResponse.json(
        { error: "Failed to find articles section." },
        { status: 500 },
      );
    }

    const articles = await articleSectionContainer.$$eval(
      "article.group.bg-white.rounded-xl.shadow-sm.transition-all.duration-300.overflow-hidden.border.border-gray-100.flex.flex-col",
      (articles) => {
        return articles.map((article) => {
          const image = article.querySelector("img")?.src || "";
          const imageAlt = article.querySelector("img")?.alt || "";
          const title = article.querySelector("h3")?.textContent?.trim() || "";
          const description =
            article.querySelector("p")?.textContent?.trim() || "";
          const link = article.querySelector("a")?.href || "";
          const slug = new URL(link).pathname.slice(1);

          return {
            image,
            imageAlt,
            title,
            description,
            slug,
            link,
            source: "laravel-magazine",
          };
        });
      },
    );

    return NextResponse.json({
      articles,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape the page." },
      { status: 500 },
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
