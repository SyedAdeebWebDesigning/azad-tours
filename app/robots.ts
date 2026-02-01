import type { MetadataRoute } from "next";

/**
 * Provide robots configuration for the site.
 *
 * Reads SITEMAP_URL from the environment and sets the sitemap to `${SITEMAP_URL}/sitemap.xml`. The rules allow all user agents to access all paths.
 *
 * @returns A robots configuration object containing a single rule that allows all user agents and a sitemap URL constructed from `SITEMAP_URL`.
 */
export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.SITEMAP_URL as string;

	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}