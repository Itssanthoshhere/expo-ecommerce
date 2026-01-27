import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-3">
        <LoaderIcon className="size-12 animate-spin text-zinc-600 dark:text-zinc-400" />
        <span className="text-lg text-zinc-500 dark:text-zinc-500">
          Loading…
        </span>
      </div>
    </div>
  );
}

export default PageLoader;
