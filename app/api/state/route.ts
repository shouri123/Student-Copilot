import { NextResponse } from 'next/server';
import { getUserState, updateUserState, initializeUser } from '../../../lib/state/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  const state = getUserState(userId);
  if (!state) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(state);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userName } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let state = getUserState(userId);
    if (!state) {
      state = initializeUser(userId, userName);
    }

    return NextResponse.json(state);
  } catch (error) {
    console.error('State API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId || !updates) {
      return NextResponse.json({ error: 'userId and updates are required' }, { status: 400 });
    }

    const state = updateUserState(userId, updates);
    return NextResponse.json(state);
  } catch (error) {
    console.error('State update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
