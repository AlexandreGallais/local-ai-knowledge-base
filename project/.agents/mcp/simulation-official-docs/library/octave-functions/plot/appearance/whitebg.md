# whitebg

```octave
function whitebg (varargin)
```

@deftypefn  {} {} whitebg ()
@deftypefnx {} {} whitebg (@var{color})
@deftypefnx {} {} whitebg ("none")
@deftypefnx {} {} whitebg (@var{hfig})
@deftypefnx {} {} whitebg (@var{hfig}, @var{color})
@deftypefnx {} {} whitebg (@var{hfig}, "none")
Invert the colors in the current color scheme.

The root properties are also inverted such that all subsequent plots will
use the new color scheme.

If the optional argument @var{color} is present then the background color
is set to @var{color} rather than inverted.  @var{color} may be a string
representing one of the eight known colors or an RGB triplet.  The special
string argument @qcode{"none"} restores the plot to the factory default
colors.

If the first argument @var{hfig} is a figure handle or list of figure
handles, then operate on these figures rather than the current figure
returned by @code{gcf}.  The root properties will not be changed unless 0
is in the list of figures.

Programming Note: @code{whitebg} operates by changing the color properties
of the children of the specified figures.  Only objects with a single color
are affected.  For example, a patch with a single @qcode{"FaceColor"} will
be changed, but a patch with shading (@qcode{"interp"}) will not be
modified.  For inversion, the new color is simply the inversion in RGB
space: @code{@var{cnew} = [1-@var{R} 1-@var{G} 1-@var{B}]}.  When a color
is specified, the axes and figure are set to the new color, and the color
of child objects are then adjusted to have some contrast (visibility)
against the new background.
@seealso{reset, get, set}
@end deftypefn
