import type { MetadataRoute } from "next";

/**
 * Generate sitemap entries for the site's root and primary pages.
 *
 * Reads the base URL from the `SITEMAP_URL` environment variable and returns sitemap entries for
 * "/", "/about", "/contact", and "/services", each including `url`, `lastModified`, `changeFrequency`, and `priority`.
 *
 * @returns An array of sitemap entry objects containing `url`, `lastModified`, `changeFrequency`, and `priority`
 */
export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = process.env.SITEMAP_URL as string;

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
	];
}