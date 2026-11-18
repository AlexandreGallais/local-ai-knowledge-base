# rotate3d

```octave
function rotate3d (hfig, option)
```

@deftypefn  {} {} rotate3d
@deftypefnx {} {} rotate3d on
@deftypefnx {} {} rotate3d off
@deftypefnx {} {} rotate3d (@var{hfig}, @var{option})
Control the interactive 3-D rotation mode of a figure in the GUI.

Given the option @qcode{"on"} or @qcode{"off"}, set the interactive
rotate mode on or off.

With no arguments, toggle the current rotate mode on or off.

If the first argument @var{hfig} is a figure, then operate on the given
figure rather than the current figure as returned by @code{gcf}.

@seealso{pan, zoom}
@end deftypefn
