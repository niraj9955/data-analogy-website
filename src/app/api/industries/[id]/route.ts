import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.industry.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      )
    }

    const industry = await db.industry.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(industry)
  } catch (error) {
    console.error('Failed to update industry:', error)
    return NextResponse.json(
      { error: 'Failed to update industry' },
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

    const existing = await db.industry.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      )
    }

    await db.industry.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete industry:', error)
    return NextResponse.json(
      { error: 'Failed to delete industry' },
      { status: 500 }
    )
  }
}
