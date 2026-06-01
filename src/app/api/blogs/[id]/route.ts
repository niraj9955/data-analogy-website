import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    // If slug is being updated, check uniqueness
    if (body.slug && body.slug !== existing.slug) {
      const slugConflict = await db.blog.findUnique({ where: { slug: body.slug } })
      if (slugConflict) {
        return NextResponse.json(
          { error: 'A blog with this slug already exists' },
          { status: 409 }
        )
      }
    }

    // Convert date string to Date object if provided
    const data = { ...body }
    if (data.date) {
      data.date = new Date(data.date)
    }

    const blog = await db.blog.update({
      where: { id },
      data,
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Failed to update blog:', error)
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.blog.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      )
    }

    await db.blog.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete blog:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    )
  }
}
