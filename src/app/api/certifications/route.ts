import { NextResponse } from 'next/server';
import { getApiData } from "@/lib/api";

export async function GET() {
  try {
    // Fetch Credly data
    const credlyPromise = getApiData(
      "https://credly.thenull.dev/stephen-freerking"
    );

    // Fetch OffSec data
    const offsecPromise = getApiData(
      "https://offsec.thenull.dev/wallet/stephen-freerking"
    );

    const [credlyResponse, offsecResponse]: [any, any] = await Promise.all([credlyPromise, offsecPromise]);

    if (credlyResponse.error && (!offsecResponse.data || offsecResponse.error)) {
      console.error('Error fetching certifications:', credlyResponse.error);
      return NextResponse.json(
        { error: 'Failed to fetch certifications' },
        { status: 500 }
      );
    }

    let allCerts: any[] = [];

    // Add Credly certs
    if (credlyResponse.data && Array.isArray(credlyResponse.data)) {
      allCerts = [...credlyResponse.data];
    } else if (credlyResponse.data && credlyResponse.data.data && Array.isArray(credlyResponse.data.data)) {
      allCerts = [...credlyResponse.data.data];
    }

    // Add OffSec certs
    if (offsecResponse.data && Array.isArray(offsecResponse.data.credentials)) {
      const mappedOffsecCerts = offsecResponse.data.credentials.map((cert: any) => ({
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

      allCerts = [...allCerts, ...mappedOffsecCerts];
    }

    return NextResponse.json({ data: allCerts });
  } catch (error) {
    console.error('Unexpected error in certifications API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
