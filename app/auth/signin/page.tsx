import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import SignIn from "@/components/sign-in";
export default async function SignInPage() {
	const headerList = await headers();
	const session = await auth.api.getSession({
		headers: headerList, // you need to pass the headers object.
	});

	if (!session) {
		return <SignIn />;
	}

	// Redirect to dashboard if already logged in
	if (!session) {
		redirect("/dashboard");
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-8 bg-card rounded-lg shadow-lg">
				<h1 className="text-2xl font-bold mb-4">Welcome</h1>
				<form
					action={async () => {
						"use server";
						try {
							await auth.api.signInSocial({
								body: {
									provider: "discord",
									redirectTo: "/dashboard",
									redirect: true,
								},
							});
						} catch (error) {
							console.error("Sign in error:", error);
							throw error; // Let Next.js error boundary handle it
						}
					}}
				>
					<Button className="w-full">Sign in with Discord</Button>
				</form>
			</div>
		</div>
	);
}
