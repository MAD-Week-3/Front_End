export default function RoommatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Roommate Finder</h2>
      {children}
    </div>
  );
}
