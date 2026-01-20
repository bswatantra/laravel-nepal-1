import { NextRequest, NextResponse } from "next/server";
import { getBrowser } from "@/lib/scraper";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const limit: string | null = searchParams.get("limit") || null;

  const targetUrl = "https://laravel-news.com/blog";

  let browser;
  try {
    browser = await getBrowser();
    const page = await browser.newPage();

    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    const blogSectionContainer = await page.$("div.grid.gap-x-8.gap-y-12");

    if (!blogSectionContainer) {
      console.error("Blog section container not found on the page.");
      return NextResponse.json(
        { error: "Failed to find blog section." },
        { status: 500 },
      );
    }

    const blogPosts = await blogSectionContainer.$$eval(
      "div.group.relative",
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
            source: "laravel-news",
          };
        });
      },
    );

    return NextResponse.json({
      blogPosts: blogPosts.slice(0, Number(limit) || blogPosts.length),
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
