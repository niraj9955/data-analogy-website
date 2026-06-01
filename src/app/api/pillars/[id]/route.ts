import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.pillar.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pillar not found' },
        { status: 404 }
      )
    }

    const pillar = await db.pillar.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(pillar)
  } catch (error) {
    console.error('Failed to update pillar:', error)
    return NextResponse.json(
      { error: 'Failed to update pillar' },
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

    const existing = await db.pillar.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Pillar not found' },
        { status: 404 }
      )
    }

    await db.pillar.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete pillar:', error)
    return NextResponse.json(
      { error: 'Failed to delete pillar' },
      { status: 500 }
    )
  }
}
