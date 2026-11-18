# colorbar

```octave
function h = colorbar (varargin)
```

@deftypefn  {} {} colorbar
@deftypefnx {} {} colorbar (@var{loc}, @dots{})
@deftypefnx {} {} colorbar (@var{delete_option})
@deftypefnx {} {} colorbar (@var{hcb}, @dots{})
@deftypefnx {} {} colorbar (@var{hax}, @dots{})
@deftypefnx {} {} colorbar (@dots{}, "location", @var{loc}, @dots{})
@deftypefnx {} {} colorbar (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {@var{h} =} colorbar (@dots{})
Add a colorbar to the current axes.

A colorbar displays the current colormap along with numerical rulings so
that the color scale can be interpreted.

The optional input @nospell{@var{loc}} determines the location of the
colorbar.  If present, it must be the first argument to @code{colorbar}.
Valid values for @nospell{@var{loc}} are

@table @asis
@item @qcode{"EastOutside"}
Place the colorbar outside the plot to the right.  This is the default.

@item @qcode{"East"}
Place the colorbar inside the plot to the right.

@item @qcode{"WestOutside"}
Place the colorbar outside the plot to the left.

@item @qcode{"West"}
Place the colorbar inside the plot to the left.

@item @qcode{"NorthOutside"}
Place the colorbar above the plot.

@item @qcode{"North"}
Place the colorbar at the top of the plot.

@item @qcode{"SouthOutside"}
Place the colorbar under the plot.

@item @qcode{"South"}
Place the colorbar at the bottom of the plot.
@end table

To remove a colorbar from a plot use any one of the following keywords for
the @var{delete_option}: @qcode{"off"}, @qcode{"delete"}, @qcode{"hide"}.

If the first argument @var{hax} is an axes handle, then the colorbar is
added to this axes, rather than the current axes returned by @code{gca}.

If the first argument @var{hcb} is a handle to a colorbar object, then
operate on this colorbar directly.

Additional property/value pairs are passed directly to the underlying axes
object.  The full list of properties is documented at @ref{Axes Properties}.

The optional return value @var{h} is a graphics handle to the created
colorbar object.

Implementation Note: A colorbar is created as an additional axes object with
the @qcode{"tag"} property set to @qcode{"colorbar"}.  The created object
has the extra property @qcode{"location"} which controls the positioning of
the colorbar.

If the argument @qcode{"peer"} is given, then the following argument is
treated as the axes handle in which to add the colorbar.  The @qcode{"peer"}
calling syntax may be removed in the future and is not recommended.
@seealso{colormap}
@end deftypefn
