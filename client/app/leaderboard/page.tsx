import { TableComp } from "@/components/table";
export default function LeaderboardPage() {
  return (
    <div>
      <h1 className="font-semibold text-4xl text-left pb-4">My Profile</h1>
      <h1 className="font-semibold text-4xl text-left pb-4">Leaderboard</h1>
      <TableComp />
    </div>
  );
}
