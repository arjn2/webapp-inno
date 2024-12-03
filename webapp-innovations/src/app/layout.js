import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "../context/Provider";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
    title: "Innovation Club DUK",
    description: "Empowering Innovators!",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Provider>
                <body className={poppins.className}>{children}</body>
            </Provider>
        </html>
    );
}
