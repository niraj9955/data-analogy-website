import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const submission = await db.contactSubmission.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! We'll get back to you soon.",
        id: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Failed to create contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}
