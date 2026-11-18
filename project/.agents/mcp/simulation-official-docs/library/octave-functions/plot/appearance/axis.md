# axis

```octave
function limits = axis (varargin)
```

@deftypefn  {} {} axis ()
@deftypefnx {} {} axis ([@var{x_lo} @var{x_hi}])
@deftypefnx {} {} axis ([@var{x_lo} @var{x_hi} @var{y_lo} @var{y_hi}])
@deftypefnx {} {} axis ([@var{x_lo} @var{x_hi} @var{y_lo} @var{y_hi} @var{z_lo} @var{z_hi}])
@deftypefnx {} {} axis ([@var{x_lo} @var{x_hi} @var{y_lo} @var{y_hi} @var{z_lo} @var{z_hi} @var{c_lo} @var{c_hi}])
@deftypefnx {} {} axis (@var{option})
@deftypefnx {} {} axis (@var{option1}, @var{option2}, @dots{})
@deftypefnx {} {} axis (@var{hax}, @dots{})
@deftypefnx {} {@var{limits} =} axis ()
Set axis limits and appearance.

The argument @var{limits} should be a 2-, 4-, 6-, or 8-element vector.  The
first and second elements specify the lower and upper limits for the
x-axis.  The third and fourth specify the limits for the y-axis, the fifth
and sixth specify the limits for the z-axis, and the seventh and eighth
specify the limits for the color axis.  The special values @code{-Inf} and
@code{Inf} may be used to indicate that the limit should be automatically
computed based on the data in the axes.

Without any arguments, @code{axis} turns autoscaling on.

With one output argument, @code{@var{limits} = axis} returns the current
axis limits.

The vector argument specifying limits is optional, and additional string
arguments may be used to specify various axis properties.

The following options control the aspect ratio of the axes.

@table @asis
@item @qcode{"equal"}
Force x-axis unit distance to equal y-axis (and z-axis) unit distance.

@item @qcode{"square"}
Force a square axis aspect ratio.

@item @nospell{@qcode{"vis3d"}}
Set aspect ratio modes (@qcode{"DataAspectRatio"},
@qcode{"PlotBoxAspectRatio"}) to @qcode{"manual"} for rotation without
stretching.

@item  @qcode{"normal"}
@itemx @qcode{"fill"}
Restore default automatically computed aspect ratios.
@end table

@noindent
The following options control the way axis limits are interpreted.

@table @asis
@item  @qcode{"auto"}
@itemx @qcode{"auto[xyz]"}
@itemx @qcode{"auto [xyz]"}
Set nice auto-computed limits around the data for all axes, or only
the specified axes.

@item @qcode{"manual"}
Fix the current axes limits.

@item @qcode{"tickaligned"}
Fix axes to the limits of the closest ticks.

@item @qcode{"tight"}
Fix axes to the limits of the data.

@item @qcode{"padded"}
Fix axes to the limits of the data plus margins of about 7% of the
data extent.

@item @qcode{"image"}
Equivalent to @qcode{"tight"} and @qcode{"equal"}.

@end table

@noindent
The following options affect the appearance of tick marks.

@table @asis
@item  @qcode{"tic"}
@itemx @qcode{"tic[xyz]"}
@itemx @qcode{"tic [xyz]"}
Turn tick marks on for all axes, or turn them on for the specified axes and
off for the remainder.

@item  @qcode{"label"}
@itemx @qcode{"label[xyz]"}
@itemx @qcode{"label [xyz]"}
Turn tick labels on for all axes, or turn them on for the specified axes
and off for the remainder.

@item @qcode{"nolabel"}
Turn tick labels off for all axes.
@end table

@noindent
The following options affect the direction of increasing values on the axes.

@table @asis
@item @qcode{"xy"}
Default y-axis, larger values are near the top.

@item @qcode{"ij"}
Reverse y-axis, smaller values are near the top.
@end table

@noindent
The following options affects the visibility of the axes.

@table @asis
@item @qcode{"on"}
Make the axes visible.

@item @qcode{"off"}
Hide the axes.
@end table

If the first argument @var{hax} is an axes handle, then operate on this
axes rather than the current axes returned by @code{gca}.

Example 1: set X/Y limits and force a square aspect ratio

@example
axis ([1, 2, 3, 4], "square");
@end example

Example 2: enable tick marks on all axes,
           enable tick mark labels only on the y-axis

@example
axis ("tic", "labely");
@end example

@seealso{xlim, ylim, zlim, clim, daspect, pbaspect, box, grid}
@end deftypefn
