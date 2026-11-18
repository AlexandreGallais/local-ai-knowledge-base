# box

```octave
function box (varargin)
```

@deftypefn  {} {} box
@deftypefnx {} {} box on
@deftypefnx {} {} box off
@deftypefnx {} {} box (@var{hax}, @dots{})
Control display of the axes border.

The argument may be either @qcode{"on"} or @qcode{"off"}.  If it is
omitted, the current box state is toggled.

If the first argument @var{hax} is an axes handle, then operate on this
axes rather than the current axes returned by @code{gca}.
@seealso{axis, grid}
@end deftypefn
