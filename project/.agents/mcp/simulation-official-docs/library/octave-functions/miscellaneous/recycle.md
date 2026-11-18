# recycle

```octave
function val = recycle (new_val)
```

@deftypefn  {} {@var{val} =} recycle ()
@deftypefnx {} {@var{old_val} =} recycle (@var{new_val})
Query or set the preference for recycling deleted files.

When recycling is enabled, commands which would permanently erase files
instead move them to a temporary location (such as the directory labeled
Trash).

Programming Note: This function is provided for @sc{matlab} compatibility,
but recycling is not implemented in Octave.  To help avoid accidental data
loss an error will be raised if an attempt is made to enable file recycling.
@seealso{delete, rmdir}
@end deftypefn
