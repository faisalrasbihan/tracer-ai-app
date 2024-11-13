import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    const response = await fetch('https://ai4indonesia-traceai.politesmoke-27809b82.southeastasia.azurecontainerapps.io/item-analysis', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        document_text: data.text
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 