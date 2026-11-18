# gco

```octave
function h = gco (hfig)
```

@deftypefn  {} {@var{h} =} gco ()
@deftypefnx {} {@var{h} =} gco (@var{hfig})
Return a handle to the current object of the current figure, or a handle
to the current object of the figure with handle @var{hfig}.

The current object of a figure is the object that was last clicked on.  It
is stored in the @qcode{"CurrentObject"} property of the target figure.

If the last mouse click did not occur on any child object of the figure,
then the current object is the figure itself.

If no mouse click occurred in the target figure, this function returns an
empty matrix.

Programming Note: The value returned by this function is not necessarily the
same as the one returned by @code{gcbo} during callback execution.  An
executing callback can be interrupted by another callback and the current
object may be changed.

@seealso{gcbo, gca, gcf, gcbf, get, set}
@end deftypefn
