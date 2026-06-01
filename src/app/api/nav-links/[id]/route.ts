import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.navLink.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Nav link not found' },
        { status: 404 }
      )
    }

    const navLink = await db.navLink.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(navLink)
  } catch (error) {
    console.error('Failed to update nav link:', error)
    return NextResponse.json(
      { error: 'Failed to update nav link' },
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

    const existing = await db.navLink.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Nav link not found' },
        { status: 404 }
      )
    }

    await db.navLink.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete nav link:', error)
    return NextResponse.json(
      { error: 'Failed to delete nav link' },
      { status: 500 }
    )
  }
}
