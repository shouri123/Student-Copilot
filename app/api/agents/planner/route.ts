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

    const response = await runAgent('planner', state, {
      current_phase_topics: state.goal.phases?.find(p => p.status === 'active')?.topics || [],
    });

    if (response.state_updates && Object.keys(response.state_updates).length > 0) {
      updateUserState(userId, response.state_updates);
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Planner agent error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
