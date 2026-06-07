export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-slate-900">College Discovery Platform</p>
          <p className="max-w-2xl text-sm text-slate-500">
            Search, compare, predict, and shortlist colleges with confidence.
          </p>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Built as a production-style MVP for college discovery and decision making.
        </p>
      </div>
    </footer>
  );
}
