import { redirect } from 'next/navigation';
import { getUser, getTeamForUser } from '@/lib/db/queries';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect('/sign-in');

  const team = await getTeamForUser(user.id);

  const status = team?.subscriptionStatus;
  const isPaid = status === 'active' || status === 'trialing';

  if (!team || !isPaid) {
    redirect('/pricing');
  }

  return <>{children}</>;
}
