import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/prisma/prisma";

if (!process.env.AUTH_DISCORD_ID || !process.env.AUTH_DISCORD_SECRET) {
	throw new Error(
		"Missing environment variables: AUTH_DISCORD_ID or AUTH_DISCORD_SECRET",
	);
}

export const auth = betterAuth({
	appName: "Naga",
	database: prismaAdapter(prisma, {
		provider: "mysql",
	}),
	socialProviders: {
		discord: {
			clientId: process.env.AUTH_DISCORD_ID,
			clientSecret: process.env.AUTH_DISCORD_SECRET,
			autoSignIn: false,
		},
	},

	rateLimit: {
		window: 10,
		max: 100,
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	plugins: [nextCookies()],
});
