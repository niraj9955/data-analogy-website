import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    let config = await db.siteConfig.findFirst()

    if (!config) {
      config = await db.siteConfig.create({
        data: {},
      })
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Failed to fetch site config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site config' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()

    // Find the existing config first
    let config = await db.siteConfig.findFirst()

    if (!config) {
      // Create if doesn't exist
      config = await db.siteConfig.create({ data: body })
    } else {
      // Update the existing config
      config = await db.siteConfig.update({
        where: { id: config.id },
        data: body,
      })
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Failed to update site config:', error)
    return NextResponse.json(
      { error: 'Failed to update site config' },
      { status: 500 }
    )
  }
}
