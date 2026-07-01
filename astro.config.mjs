// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	integrations: [sitemap()],
	output: "static",
	prefetch: true,
	vite: {
		plugins: [tailwindcss()],
		build: {
			cssMinify: "lightningcss",
		},
	},
	compressHTML: true,
	site: "https://westerncode.com",
	build: {
		inlineStylesheets: "auto",
	},
	image: {
		remotePatterns: [{ protocol: "https" }],
	},
});
