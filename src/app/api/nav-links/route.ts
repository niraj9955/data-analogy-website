import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const navLinks = await db.navLink.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(navLinks)
  } catch (error) {
    console.error('Failed to fetch nav links:', error)
    return NextResponse.json(
      { error: 'Failed to fetch nav links' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.label || !body.href) {
      return NextResponse.json(
        { error: 'Label and href are required' },
        { status: 400 }
      )
    }

    const navLink = await db.navLink.create({
      data: {
        label: body.label,
        href: body.href,
        order: body.order ?? 0,
        active: body.active ?? true,
      },
    })

    return NextResponse.json(navLink, { status: 201 })
  } catch (error) {
    console.error('Failed to create nav link:', error)
    return NextResponse.json(
      { error: 'Failed to create nav link' },
      { status: 500 }
    )
  }
}
