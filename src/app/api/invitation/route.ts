import { NextResponse } from 'next/server';
import { INITIAL_PAGES } from '@/constants/initialData';

// Simple in-memory / state store for published invitations during session
const invitationsStore: Record<string, any> = {
  'dimas-clarissa': {
    slug: 'dimas-clarissa',
    title: 'The Wedding of Dimas & Clarissa',
    pages: INITIAL_PAGES,
    updatedAt: new Date().toISOString()
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') || 'dimas-clarissa';

  const data = invitationsStore[slug] || {
    slug,
    title: 'The Wedding of Dimas & Clarissa',
    pages: INITIAL_PAGES,
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug = 'dimas-clarissa', title, pages } = body;

    invitationsStore[slug] = {
      slug,
      title: title || 'The Wedding of Dimas & Clarissa',
      pages: pages || INITIAL_PAGES,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: 'Undangan berhasil disimpan & dipublikasikan secara live',
      url: `/${slug}`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses data undangan' },
      { status: 500 }
    );
  }
}

