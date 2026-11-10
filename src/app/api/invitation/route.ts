import { NextResponse } from 'next/server';
import { INITIAL_PAGES } from '../../../constants/initialData';
import { getInvitationFromDb, saveInvitationToDb } from '../../../lib/invitationService';

// In-memory / session fallback store
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

  // 1. Try PostgreSQL database first
  const dbInvitation = await getInvitationFromDb(slug);
  if (dbInvitation) {
    return NextResponse.json({ success: true, data: dbInvitation });
  }

  // 2. Fallback to memory store
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
    const { slug = 'dimas-clarissa', title, pages, customElements, culturalTheme, colorTheme } = body;

    // 1. Update in-memory fallback
    invitationsStore[slug] = {
      slug,
      title: title || 'The Wedding of Dimas & Clarissa',
      pages: pages || INITIAL_PAGES,
      customElements: customElements || [],
      updatedAt: new Date().toISOString()
    };

    // 2. Persist to PostgreSQL database asynchronously
    await saveInvitationToDb({
      slug,
      title,
      pagesData: pages,
      customElements,
      culturalTheme,
      colorTheme,
    });

    return NextResponse.json({
      success: true,
      message: 'Undangan berhasil disimpan ke database & dipublikasikan secara live',
      url: `/${slug}`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses data undangan' },
      { status: 500 }
    );
  }
}

