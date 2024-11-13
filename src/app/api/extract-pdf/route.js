import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle raw data
  },
};

export async function POST(request) {
  try {
    if (!request.body) {
      return NextResponse.json(
        { error: 'No request body' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse PDF
    const data = await pdf(buffer);

    return NextResponse.json({
      success: true,
      text: data.text,
      info: data.info
    });

  } catch (error) {
    console.error('PDF extraction error:', error);
    return NextResponse.json(
      { 
        error: 'PDF extraction failed',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 