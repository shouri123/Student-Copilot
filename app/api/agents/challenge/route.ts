import { NextResponse } from 'next/server';
import { runAgent } from '../../../../lib/agents/engine';
import { getUserState, updateUserState, initializeUser } from '../../../../lib/state/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    let state = getUserState(userId);
    if (!state) {
      state = initializeUser(userId);
    }

    const response = await runAgent('challenge', state, {
      challenge_history: state.challenge_history || [],
    });

    if (response.state_updates && Object.keys(response.state_updates).length > 0) {
      updateUserState(userId, response.state_updates);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Challenge agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
