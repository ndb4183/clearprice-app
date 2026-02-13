import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export default async function DashboardPage() {
  // 1️⃣ Must be signed in
  const user = await getUser();
  if (!user) redirect('/sign-in');

  // 2️⃣ In this codebase, getTeamForUser takes NO arguments
  const team = await getTeamForUser();

  const status = team?.subscriptionStatus;
  const isPaid = status === 'active' || status === 'trialing';

  // 3️⃣ If no team or not paid → send to pricing
  if (!team || !isPaid) {
    redirect('/pricing');
  }

  // 4️⃣ Otherwise show dashboard
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>
        Plan: {team.planName ?? '—'} ({status})
      </p>
    </main>
  );
}
