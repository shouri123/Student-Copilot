import { NextResponse } from 'next/server';
import { runAgent } from '../../../../lib/agents/engine';
import { getUserState, updateUserState, initializeUser } from '../../../../lib/state/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userName, goalText, background } = body;

    if (!userId || !goalText) {
      return NextResponse.json({ error: 'userId and goalText are required' }, { status: 400 });
    }

    // Initialize user if needed
    let state = getUserState(userId);
    if (!state) {
      state = initializeUser(userId, userName);
    }

    const response = await runAgent('goal', state, {
      user_goal_text: goalText,
      user_background: background || 'beginner',
    });

    // Apply state updates
    if (response.state_updates && Object.keys(response.state_updates).length > 0) {
      updateUserState(userId, response.state_updates);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Goal agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
