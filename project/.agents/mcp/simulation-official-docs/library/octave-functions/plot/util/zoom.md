# zoom

```octave
function zoom (hfig, option)
```

@deftypefn  {} {} zoom
@deftypefnx {} {} zoom (@var{factor})
@deftypefnx {} {} zoom on
@deftypefnx {} {} zoom off
@deftypefnx {} {} zoom xon
@deftypefnx {} {} zoom yon
@deftypefnx {} {} zoom out
@deftypefnx {} {} zoom reset
@deftypefnx {} {} zoom (@var{hfig}, @var{option})
Zoom the current axes object or control the interactive zoom mode of a
figure in the GUI.

Given a numeric argument greater than zero, zoom by the given factor.  If
the zoom factor is greater than one, zoom in on the plot.  If the factor
is less than one, zoom out.  If the zoom factor is a two- or three-element
vector, then the elements specify the zoom factors for the x, y, and z
axes respectively.

Given the option @qcode{"on"} or @qcode{"off"}, set the interactive zoom
mode on or off.

With no arguments, toggle the current zoom mode on or off.

Given the option @qcode{"xon"} or @qcode{"yon"}, enable zoom mode for the
x or y-axis only.

Given the option @qcode{"out"}, zoom to the initial zoom setting.

Given the option @qcode{"reset"}, store the current zoom setting so that
@code{zoom out} will return to this zoom level.

If the first argument @var{hfig} is a figure, then operate on the given
figure rather than the current figure as returned by @code{gcf}.

@seealso{pan, rotate3d}
@end deftypefn
