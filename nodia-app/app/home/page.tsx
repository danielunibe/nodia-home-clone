export default function HomeEnvironmentPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black">
      <iframe
        src="/start-lobby/index.html"
        title="Nodia Start Lobby"
        className="h-full w-full border-0"
      />
    </div>
  );
}
