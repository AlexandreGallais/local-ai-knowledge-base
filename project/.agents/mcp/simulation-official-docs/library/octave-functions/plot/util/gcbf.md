# gcbf

```octave
function fig = gcbf ()
```

@deftypefn {} {@var{fig} =} gcbf ()
Return a handle to the figure containing the object whose callback is
currently executing.

If no callback is executing, this function returns the empty matrix.  The
handle returned by this function is the same as the second output argument
of @code{gcbo}.

@seealso{gcbo, gcf, gco, gca, get, set}
@end deftypefn
