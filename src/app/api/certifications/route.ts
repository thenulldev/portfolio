import { NextResponse } from 'next/server';
import { getApiData, ApiResponse } from "@/lib/api";

// Minimal certification type for internal use - only fields actually used by the portfolio
interface CertData {
  id: string;
  badge_template: {
    name: string;
    description: string;
    skills: { name: string }[];
  };
  issued_at_date: string;
  expires_at_date?: string;
  issuer: {
    entities: {
      entity: { name: string };
    }[];
  };
  image: {
    url: string;
  };
  verification_url?: string;
}

interface OffSecCredential {
  id: string;
  name: string;
  description: string;
  outcomes?: string[];
  issuedOn: string;
  expiredOn?: string;
  issuer?: string;
  imageUrl: string;
  url: string;
}

interface OffSecData {
  credentials?: OffSecCredential[];
}

type CredlyResponse = ApiResponse<CertData[] | { data: CertData[] }>;
type OffSecResponse = ApiResponse<OffSecData>;

export async function GET() {
  try {
    const credlyPromise = getApiData<CertData[] | { data: CertData[] }>("https://credly.thenull.dev/stephen-freerking");
    const offsecPromise = getApiData<OffSecData>("https://offsec.thenull.dev/wallet/stephen-freerking");

    const [credlyResponse, offsecResponse]: [CredlyResponse, OffSecResponse] = await Promise.all([credlyPromise, offsecPromise]);

    if (credlyResponse.error && (!offsecResponse.data || offsecResponse.error)) {
      console.error('Error fetching certifications:', credlyResponse.error);
      return NextResponse.json(
        { error: 'Failed to fetch certifications' },
        { status: 500 }
      );
    }

    const allCerts: CertData[] = [];

      if (credlyResponse.data) {
      const credlyArray = Array.isArray(credlyResponse.data)
        ? credlyResponse.data
        : (credlyResponse.data as unknown as { data: CertData[] }).data;
      if (Array.isArray(credlyArray)) {
        // Credly doesn't always include verification_url; construct from badge id
        for (const cert of credlyArray) {
          if (!cert.verification_url && cert.id) {
            (cert as CertData).verification_url = `https://www.credly.com/badges/${cert.id}/public_url`;
          }
        }
        allCerts.push(...credlyArray);
      }
    }

    if (offsecResponse.data?.credentials) {
      const mappedOffsecCerts: CertData[] = offsecResponse.data.credentials.map((cert: OffSecCredential) => ({
        id: cert.id,
        badge_template: {
          name: cert.name,
          description: cert.description,
          skills: (cert.outcomes || []).map((outcome: string) => ({ name: outcome }))
        },
        issued_at_date: cert.issuedOn,
        expires_at_date: cert.expiredOn,
        issuer: {
          entities: [{
            entity: { name: cert.issuer || 'OffSec' }
          }]
        },
        image: {
          url: cert.imageUrl
        },
        verification_url: cert.url
      }));

      allCerts.push(...mappedOffsecCerts);
    }

    return NextResponse.json({ data: allCerts }, {
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('Unexpected error in certifications API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}