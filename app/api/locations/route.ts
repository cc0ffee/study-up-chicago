import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const locations = await prisma.place.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(locations);
    } catch (err) {
        console.error("Failed to fetch locations:", err);
        return NextResponse.json(
            { error: 'Failed to fetch locations' },
            { status: 500 }
          );
    }
}