export default function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-background gap-4">
      <img src="/icon-1024.png" alt="RepoCanvas" className="w-20 h-20 animate-pulse" />
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-lg font-bold tracking-tight">RepoCanvas</h1>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
