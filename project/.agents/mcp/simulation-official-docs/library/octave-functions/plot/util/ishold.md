# ishold

```octave
function tf = ishold (h)
```

@deftypefn  {} {@var{tf} =} ishold
@deftypefnx {} {@var{tf} =} ishold (@var{hax})
@deftypefnx {} {@var{tf} =} ishold (@var{hfig})
Return true if the next plot will be added to the current plot, or
false if the plot device will be cleared before drawing the next plot.

If the first argument is an axes handle @var{hax} or figure handle
@var{hfig} then operate on this plot rather than the current one.
@seealso{hold, newplot}
@end deftypefn
