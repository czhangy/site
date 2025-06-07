import type { NextConfig } from "next";

const path = require("path");
const nextConfig: NextConfig = {
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		prependData: `@import "@/styles/mixins"; @import "@/styles/variables";`,
		silenceDeprecations: ["import", "legacy-js-api"],
	},
};

export default nextConfig;
