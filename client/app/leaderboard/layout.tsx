export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center max-w-full w-full gap-4 md:py-10">
      <div className="inline-block text-center justify-center max-w-full">
        {children}
      </div>
    </section>
  );
}
