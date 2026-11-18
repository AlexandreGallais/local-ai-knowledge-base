# shg

```octave
function shg ()
```

@deftypefn {} {} shg
Show the graph window.

This function makes the current figure visible, and places it on top of
of all other plot windows.

Programming Note: @code{shg} is equivalent to @code{figure (gcf)} assuming
that a current figure exists.
@seealso{figure, drawnow, gcf}
@end deftypefn
