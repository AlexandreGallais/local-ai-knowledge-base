# grid

```octave
function grid (varargin)
```

@deftypefn  {} {} grid
@deftypefnx {} {} grid on
@deftypefnx {} {} grid off
@deftypefnx {} {} grid minor
@deftypefnx {} {} grid minor on
@deftypefnx {} {} grid minor off
@deftypefnx {} {} grid (@var{hax}, @dots{})
Control the display of plot grid lines.

The function state input may be either @qcode{"on"} or @qcode{"off"}.
If it is omitted, the current grid state is toggled.

When the first argument is @qcode{"minor"} all subsequent commands
modify the minor grid rather than the major grid.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

To control the grid lines for an individual axes use the @code{set}
function.  For example:

@example
set (gca, "ygrid", "on");
@end example
@seealso{axis, box}
@end deftypefn
