'use server'
import { connectToDB } from '@/lib/mongodb';
import ViewedCrypto from '@/models/viewed-crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const resultsPerPage = parseInt(searchParams.get('resultsPerPage') || '10');
    let page = parseInt(searchParams.get('page') || '1');
    let sortBy = searchParams.get('sortBy') || 'updated_at';
    page = page - 1

    await connectToDB();
    const viewedCrypto = await ViewedCrypto.find({}).skip(page * resultsPerPage).limit(resultsPerPage).sort({[sortBy]: -1});
    return NextResponse.json(viewedCrypto)
}

