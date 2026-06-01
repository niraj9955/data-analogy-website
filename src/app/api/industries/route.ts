import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const industries = await db.industry.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      take: 8,
    })
    return NextResponse.json(industries)
  } catch (error) {
    console.error('Failed to fetch industries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.desc || !body.image) {
      return NextResponse.json(
        { error: 'Name, description, and image are required' },
        { status: 400 }
      )
    }

    const industry = await db.industry.create({
      data: {
        name: body.name,
        desc: body.desc,
        image: body.image,
        icon: body.icon ?? 'Factory',
        order: body.order ?? 0,
        active: body.active ?? true,
      },
    })

    return NextResponse.json(industry, { status: 201 })
  } catch (error) {
    console.error('Failed to create industry:', error)
    return NextResponse.json(
      { error: 'Failed to create industry' },
      { status: 500 }
    )
  }
}
