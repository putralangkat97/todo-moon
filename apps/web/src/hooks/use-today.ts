import {useMemo, useSyncExternalStore} from 'react';

const subscribe = () => () => {};

// Returns a primitive (start of local day, in ms) so the snapshot stays
// stable between calls. Returning `new Date()` directly would loop forever.
function getSnapshot() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

const getServerSnapshot = () => null;

/** Today's local date. `undefined` on the server and during hydration. */
export function useToday(): Date | undefined {
  const timestamp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return useMemo(() => (timestamp === null ? undefined : new Date(timestamp)), [timestamp]);
}
