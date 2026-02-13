import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export default async function HomePage() {
  // 1) Must be signed in
  const user = await getUser();
  if (!user) redirect('/sign-in');

  // 2) Must have a team + an active/trialing subscription
  const team = await getTeamForUser(user.id);

  const status = team?.subscriptionStatus; // e.g. 'trialing' | 'active' | 'canceled' etc.
  const isPaid = status === 'active' || status === 'trialing';

  if (!team || !isPaid) {
    redirect('/pricing');
  }

  // ✅ If they pass the checks, show the dashboard page
  return (
    <main>
      {/* Keep your existing dashboard UI here */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Plan: {team.planName ?? '—'} ({status})</p>
    </main>
  );
}
π
