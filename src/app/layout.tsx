import type { Metadata } from "next";
import "./globals.css";
import StoreHydration from "@/stores/StoreHydration";
import { AuthModals } from "@/components/AuthModal";
import ErrorBoundary from "@/components/ErrorBoundary";
import Script from "next/script";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Koursair | Group Travel Experiences",
    template: "%s | Koursair",
  },
  description: "Koursair reinvents group travel with curated, high-energy trips to the world's most iconic destinations.",
  metadataBase: new URL("https://koursair.com"),
  openGraph: {
    type: "website",
    siteName: "Koursair",
    locale: "en_US",
    images: [
      {
        url: "https://koursair-media.s3.us-east-1.amazonaws.com/images/banners/solobanner.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to media origins for faster asset loading */}
        <link rel="preconnect" href="https://koursair-media.s3.us-east-1.amazonaws.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* 1. Google Tag Manager - Main Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W3CW6S2L');
          `}
        </Script>

        {/* Existing Google Analytics (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KDF0J57BPD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KDF0J57BPD');
          `}
        </Script>

        {/* --- META PIXEL CODE (JS Only) --- */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '926422519821316');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        {/* 2. Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3CW6S2L"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ErrorBoundary>
          <StoreHydration>
            {children}
            <AuthModals />
          </StoreHydration>
        </ErrorBoundary>
        <Toaster richColors position="top-center" closeButton duration={3000} />
      </body>
    </html>
  );
}
