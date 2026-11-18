# pan

```octave
function pan (hfig, option)
```

@deftypefn  {} {} pan
@deftypefnx {} {} pan on
@deftypefnx {} {} pan off
@deftypefnx {} {} pan xon
@deftypefnx {} {} pan yon
@deftypefnx {} {} pan (@var{hfig}, @var{option})
Control the interactive panning mode of a figure in the GUI.

Given the option @qcode{"on"} or @qcode{"off"}, set the interactive
pan mode on or off.

With no arguments, toggle the current pan mode on or off.

Given the option @qcode{"xon"} or @qcode{"yon"}, enable pan mode
for the x or y axis only.

If the first argument @var{hfig} is a figure, then operate on the given
figure rather than the current figure as returned by @code{gcf}.

@seealso{rotate3d, zoom}
@end deftypefn
