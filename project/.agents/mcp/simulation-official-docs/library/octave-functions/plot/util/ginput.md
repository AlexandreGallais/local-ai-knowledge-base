# ginput

```octave
function varargout = ginput (n = -1)
```

@deftypefn  {} {[@var{x}, @var{y}, @var{buttons}] =} ginput (@var{n})
@deftypefnx {} {[@var{x}, @var{y}, @var{buttons}] =} ginput ()
Return the position and type of mouse button clicks and/or key strokes
in the current figure window.

If @var{n} is defined, then capture @var{n} events before returning.
When @var{n} is not defined @code{ginput} will loop until the return key
@key{RET} is pressed.

The return values @var{x}, @var{y} are the coordinates where the mouse
was clicked in the units of the current axes.  The return value @var{button}
is 1, 2, or 3 for the left, middle, or right button.  If a key is pressed
the ASCII value is returned in @var{button}.

Implementation Note: @code{ginput} is intenteded for 2-D plots.  For 3-D
plots see the @var{currentpoint} property of the current axes which can be
transformed with knowledge of the current @code{view} into data units.
@seealso{gtext, waitforbuttonpress}
@end deftypefn
