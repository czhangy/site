import Navbar from "@/components/Navbar/Navbar";
import "@/styles/globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "czhangy.io",
	description: "Charles Zhang's personal site",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
