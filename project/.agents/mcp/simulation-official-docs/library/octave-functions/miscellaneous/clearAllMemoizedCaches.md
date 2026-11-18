# clearAllMemoizedCaches

```octave
function clearAllMemoizedCaches ()
```

@deftypefn {} {} clearAllMemoizedCaches ()
Clear all memoized caches.

Memoization maintains internal tables of which functions have been called
with which inputs.  This function clears those tables to free memory,
or for a fresh start.

@seealso{memoize}
@end deftypefn
