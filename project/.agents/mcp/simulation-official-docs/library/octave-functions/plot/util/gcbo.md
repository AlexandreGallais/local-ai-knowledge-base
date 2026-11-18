# gcbo

```octave
function [h, fig] = gcbo ()
```

@deftypefn  {} {@var{h} =} gcbo ()
@deftypefnx {} {[@var{h}, @var{fig}] =} gcbo ()
Return a handle to the object whose callback is currently executing.

If no callback is executing, this function returns the empty matrix.  This
handle is obtained from the root object property @qcode{"CallbackObject"}.

When called with a second output argument, return the handle of the figure
containing the object whose callback is currently executing.  If no callback
is executing the second output is also set to the empty matrix.

@seealso{gcbf, gco, gca, gcf, get, set}
@end deftypefn
