# axes

```octave
function h = axes (varargin)
```

@deftypefn  {} {} axes ()
@deftypefnx {} {} axes (@var{property}, @var{value}, @dots{})
@deftypefnx {} {} axes (@var{hpar}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} axes (@var{hax})
@deftypefnx {} {@var{h} =} axes (@dots{})
Create a Cartesian axes object and return a handle to it, or set the current
axes to @var{hax}.

Called without any arguments, or with @var{property}/@var{value} pairs,
construct a new axes.  The optional argument @var{hpar} is a graphics handle
specifying the parent for the new axes and may be a figure, uipanel, or
uitab.

Called with a single axes handle argument @var{hax}, the function makes
@var{hax} the current axes (as returned by @code{gca}).  It also makes
the figure which contains @var{hax} the current figure (as returned by
@code{gcf}).  Finally, it restacks the parent object's @code{children}
property so that the axes @var{hax} appears before all other axes handles
in the list.  This causes @var{hax} to be displayed on top of any other axes
objects (Z-order stacking).  In addition it restacks any legend or colorbar
objects associated with @var{hax} so that they are also visible.

Programming Note: The full list of properties is documented at
@ref{Axes Properties}.
@seealso{gca, set, get}
@end deftypefn
