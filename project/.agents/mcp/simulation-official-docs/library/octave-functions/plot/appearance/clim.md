# clim

```octave
function limits = clim (varargin)
```

@deftypefn  {} {} clim ([cmin cmax])
@deftypefnx {} {} clim ("auto")
@deftypefnx {} {} clim ("manual")
@deftypefnx {} {} clim (@var{hax}, @dots{})
@deftypefnx {} {@var{limits} =} clim ()
Query or set color axis limits for plots.

The limits argument should be a 2-element vector specifying the lower and
upper limits to assign to the first and last value in the colormap.  Data
values outside this range are clamped to the first and last colormap
entries.

If the @qcode{"auto"} option is given then automatic colormap limits are
applied.  The automatic algorithm sets @var{cmin} to the minimum data value
and @var{cmax} to the maximum data value.  If @qcode{"manual"} is specified
then the @qcode{"climmode"} property is set to @qcode{"manual"} and the
numeric values in the @qcode{"clim"} property are used for limits.

If the first argument @var{hax} is an axes handle, then operate on
this axes rather than the current axes returned by @code{gca}.

Called without arguments the current color axis limits are returned.

Programming Note: The color axis affects the display of image, patch, and
surface graphics objects, but @strong{only} if the @qcode{"cdata"} property
has indexed data and the @qcode{"cdatamapping"} property is set to
@qcode{"scaled"}.  Graphic objects with true color @code{cdata}, or
@qcode{"direct"} @code{cdatamapping} are not affected.
@seealso{colormap, axis}
@end deftypefn
