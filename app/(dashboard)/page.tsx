import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export default async function HomePage() {
  // Must be signed in
  const user = await getUser();
  if (!user) redirect('/sign-in');

  // In this codebase, getTeamForUser() takes NO arguments
  const team = await getTeamForUser();

  const status = team?.subscriptionStatus; // 'trialing' | 'active' | etc.
  const isPaid = status === 'active' || status === 'trialing';

  if (!team || !isPaid) {
    redirect('/pricing');
  }

  // You can swap this for your real dashboard home UI later
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-sm opacity-80">
        Plan: {team.planName ?? '-'} ({status ?? 'unknown'})
      </p>
    </main>
  );
}
