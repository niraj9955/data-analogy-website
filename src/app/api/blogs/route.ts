import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function GET() {
  try {
    const blogs = await db.blog.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
      take: 6,
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title || !body.excerpt || !body.category || !body.image) {
      return NextResponse.json(
        { error: 'Title, excerpt, category, and image are required' },
        { status: 400 }
      )
    }

    const slug = body.slug || generateSlug(body.title)

    // Check for slug uniqueness
    const existing = await db.blog.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists' },
        { status: 409 }
      )
    }

    const blog = await db.blog.create({
      data: {
        slug,
        title: body.title,
        excerpt: body.excerpt,
        content: body.content ?? '',
        category: body.category,
        author: body.author ?? 'Data Analogy Team',
        image: body.image,
        date: body.date ? new Date(body.date) : new Date(),
        published: body.published ?? true,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error('Failed to create blog:', error)
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    )
  }
}
