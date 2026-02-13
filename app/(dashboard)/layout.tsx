import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // 1) Must be signed in
  const user = await getUser();
  if (!user) redirect('/sign-in');

  // 2) Must have a team + an active/trialing subscription
  // IMPORTANT: In this codebase, getTeamForUser() takes NO arguments
  const team = await getTeamForUser();

  const status = team?.subscriptionStatus; // e.g. 'trialing' | 'active' | 'canceled' | etc.
  const isPaid = status === 'active' || status === 'trialing';

  if (!team || !isPaid) {
    redirect('/pricing');
  }

  // ✅ Passed all checks, render dashboard routes
  return <>{children}</>;
}
