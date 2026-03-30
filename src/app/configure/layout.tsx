// This layout intentionally has no Navbar or Footer
// The configurator is a standalone full-screen iPad tool
export default function ConfigureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
