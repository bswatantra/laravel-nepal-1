import http from "@/lib/axios";

type PaginationParams = {
  page: number;
  limit?: number;
};

type Blog = Record<string, any>;
type Article = Record<string, any>;

function buildParams({ page, limit }: PaginationParams) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (limit !== undefined) params.set("limit", String(limit));
  return params;
}

export async function fetchBlogs({
  page,
  limit,
}: PaginationParams): Promise<Blog[]> {
  const params = buildParams({ page, limit });
  const { data } = await http.get(`/blogs`, { params });
  return data.blogs ?? [];
}

export async function fetchArticles({
  page,
  limit,
}: PaginationParams): Promise<Article[]> {
  const params = buildParams({ page, limit });
  const { data } = await http.get(`/articles`, { params });
  return data.articles ?? [];
}

export async function fetchPosts({ page, limit }: PaginationParams) {
  console.log("page", page);
  const [blogs, articles] = await Promise.all([
    fetchBlogs({ page, limit }),
    fetchArticles({ page, limit }),
  ]);

  const posts = [...blogs, ...articles];

  return posts;
}

export async function fetchPostsWithMixedSources({
  page,
  limit = 15,
}: PaginationParams) {
  const perSourceLimit = Math.ceil(limit / 2) + 1;

  const [blogs, articles] = await Promise.all([
    fetchBlogs({ page, limit: perSourceLimit }),
    fetchArticles({ page, limit: perSourceLimit }),
  ]);

  const laravelNews: any[] = [];
  const magazine: any[] = [];

  let i = blogs.length;
  while (i--) {
    const post = blogs[i];
    (post.source === "laravel-news" ? laravelNews : magazine).unshift(post);
  }

  i = articles.length;
  while (i--) {
    const post = articles[i];
    (post.source === "laravel-magazine" ? magazine : laravelNews).unshift(post);
  }

  const totalPosts = Math.min(limit, laravelNews.length + magazine.length);
  const interleaved = new Array(totalPosts);
  let writeIndex = 0;
  let laravelIndex = 0;
  let magazineIndex = 0;

  while (writeIndex < totalPosts) {
    const laravelBatch = Math.min(
      2,
      totalPosts - writeIndex,
      laravelNews.length - laravelIndex,
    );
    for (let i = 0; i < laravelBatch; i++) {
      interleaved[writeIndex++] = laravelNews[laravelIndex++];
    }

    if (writeIndex >= totalPosts) break;

    const magazineBatch = Math.min(
      2,
      totalPosts - writeIndex,
      magazine.length - magazineIndex,
    );
    for (let i = 0; i < magazineBatch; i++) {
      interleaved[writeIndex++] = magazine[magazineIndex++];
    }

    if (laravelIndex >= laravelNews.length && magazineIndex >= magazine.length)
      break;
  }

  return interleaved;
}
