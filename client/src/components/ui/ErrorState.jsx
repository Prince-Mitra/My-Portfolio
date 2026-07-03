export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 py-16 text-center">
      <p className="font-mono text-sm text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-lg border border-red-500/30 px-4 py-1.5 text-sm text-red-300 hover:bg-red-500/10"
        >
          Try again
        </button>
      )}
    </div>
  );
}
