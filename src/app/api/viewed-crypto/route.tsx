'use server'
import { connectToDB } from '@/lib/mongodb';
import ViewedCrypto from '@/models/viewed-crypto';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
    try {
        await connectToDB();
        const body = await req.json();
        const {
            symbol
        } = body;

        if (!body || !symbol) {
            throw new Error('Please provide details properly!')
        }
        
        let cryptoData = await ViewedCrypto.findOne({
            cryto_code: symbol
        })

        if (cryptoData) {
            cryptoData.viewed = cryptoData.viewed + 1
            cryptoData.updated_at = new Date();
            await cryptoData.save();
        } else {
            let payload = {
                cryto_code: symbol,
                cryto_id: body.id,
                viewed: 1,
                meta_data: body,
                created_at: new Date(),
                updated_at: new Date()
            }
            cryptoData = await ViewedCrypto.create(payload)
        }

        

        return NextResponse.json(cryptoData);
    }
    catch (error) {
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
}
