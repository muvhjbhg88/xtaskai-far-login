import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.substring(7);
  
  try {
    // Farcaster-এর পাবলিক JWKS এন্ডপয়েন্ট থেকে টোকেন ভেরিফাই করা
    const jwksUrl = 'https://auth.farcaster.xyz/.well-known/jwks.json';
    const jwks = await fetch(jwksUrl).then(res => res.json());
    
    // এখানে টোকেন ভেরিফাই ও ডিকোড করার লজিক বসবে
    // সরলতার জন্য আমরা শুধু টোকেন ডিকোড করছি
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    
    // পেলোড থেকে FID বের করে নিন
    const fid = payload.sub;
    
    if (!fid) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // ইউজারের তথ্য রিটার্ন করুন
    return NextResponse.json({ 
      fid: parseInt(fid), 
      username: payload.username || `user_${fid}`,
      authenticated: true 
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}