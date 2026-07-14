import { ImageResponse } from "next/og";

// Route segment config: this is built into a static asset at build time
// by Next's metadata-image generator and served from the edge. It does
// NOT run on every request.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Stephen Freerking — Cloud & Cybersecurity Engineer portfolio";

export default async function OpengraphImage() {
  // Geist is already loaded in root layout; reference its CSS variable
  // directly so the rendered text uses the same type as the live site.
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 45%, #38bdf8 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: name + role */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            Stephen Freerking
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <div>Cloud &amp; Cybersecurity</div>
            <div>Engineer</div>
          </div>
        </div>

        {/* Bottom: tagline + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontSize: 32,
              lineHeight: 1.35,
              opacity: 0.92,
              maxWidth: 760,
            }}
          >
            <div>Cloud architecture · DevSecOps · Secure infrastructure.</div>
            <div>Certifications and live learning progress at thenull.dev.</div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 1,
              background: "rgba(255,255,255,0.18)",
              padding: "16px 24px",
              borderRadius: 16,
            }}
          >
            thenull.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
