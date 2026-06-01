import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const pillars = await db.pillar.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(pillars)
  } catch (error) {
    console.error('Failed to fetch pillars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pillars' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.title || !body.desc) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const pillar = await db.pillar.create({
      data: {
        title: body.title,
        desc: body.desc,
        icon: body.icon ?? 'Target',
        gradient: body.gradient ?? 'from-red-500 to-red-700',
        accentColor: body.accentColor ?? 'text-red-500',
        image: body.image ?? '/pillars/precision-new.png',
        order: body.order ?? 0,
        active: body.active ?? true,
      },
    })

    return NextResponse.json(pillar, { status: 201 })
  } catch (error) {
    console.error('Failed to create pillar:', error)
    return NextResponse.json(
      { error: 'Failed to create pillar' },
      { status: 500 }
    )
  }
}
