export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-center">
      <p className="text-red-300">{message || "Something went wrong. Please try again."}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-100 transition hover:bg-zinc-700"
        >
          Retry
        </button>
      )}
    </div>
  );
}
