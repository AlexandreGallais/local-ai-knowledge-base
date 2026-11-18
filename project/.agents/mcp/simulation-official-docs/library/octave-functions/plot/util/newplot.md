# newplot

```octave
function hax = newplot (hg = [])
```

@deftypefn  {} {} newplot ()
@deftypefnx {} {} newplot (@var{hfig})
@deftypefnx {} {} newplot (@var{hax})
@deftypefnx {} {@var{hax} =} newplot (@dots{})
Prepare graphics engine to produce a new plot.

This function is called at the beginning of all high-level plotting
functions.  It is not normally required in user programs.  @code{newplot}
queries the @qcode{"NextPlot"} field of the current figure and axes to
determine what to do.

@multitable @columnfractions .25 .75
@headitem Figure NextPlot @tab Action
@item @qcode{"add"} (default) @tab Add new graphic objects to the current
figure.

@item @qcode{"new"} @tab Create a new figure and make it the current figure.

@item @qcode{"replace"} @tab Delete all child objects of the figure and
reset all figure properties to their defaults.  However, the following
four properties are not reset: Position, Units, PaperPosition, PaperUnits.
In addition, the NextPlot property is set to @qcode{"add"} regardless of
user-defined defaults.  This is equivalent to @code{clf reset}.

@item @qcode{"replacechildren"} @tab Delete child objects whose
HandleVisibility is set to @qcode{"on"}.  Set NextPlot property to
@qcode{"add"}.  This typically clears a figure, but leaves in place hidden
objects such as menubars.  This is equivalent to @code{clf}.
@end multitable

@multitable @columnfractions .25 .75
@headitem Axes NextPlot @tab Action
@item @qcode{"add"} @tab Add new graphic objects to the current axes.  This
is equivalent to @code{hold on}.

@item @qcode{"replace"} (default) @tab Delete all child objects of the
axes and reset all axes properties to their defaults.  However, the
following properties are not reset: Position, Units.  This is equivalent
to @code{cla reset}.

@c FIXME: Uncomment when "replaceall" property value added to axes
@c @item @qcode{"replaceall"} @tab For plots with one y-axis this is equivalent
@c to @qcode{"replace"}.  For plots created with @code{plotyy}, operate on both
@c axes rather than just the single axes object @code{hax}.

@item @qcode{"replacechildren"} @tab Delete child objects whose
HandleVisibility is set to @qcode{"on"}, but leave axes properties
unmodified except for ColorOrderIndex and LineStyleOrderIndex which are set
to 1.  This typically clears a plot, but preserves special settings such as
log scaling for axes.  This is equivalent to @code{cla}.

@end multitable

If the optional input @var{hfig} or @var{hax} is given then prepare the
specified figure or axes rather than the current figure and axes.

The optional return value @var{hax} is a graphics handle to the created
axes object (not figure).
@end deftypefn
