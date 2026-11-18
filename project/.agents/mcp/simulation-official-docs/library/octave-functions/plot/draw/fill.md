# fill

```octave
function h = fill (varargin)
```

@deftypefn  {} {} fill (@var{x}, @var{y}, @var{c})
@deftypefnx {} {} fill (@var{x1}, @var{y1}, @var{c1}, @var{x2}, @var{y2}, @var{c2})
@deftypefnx {} {} fill (@dots{}, @var{prop}, @var{val})
@deftypefnx {} {} fill (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} fill (@dots{})
Create one or more filled 2-D polygons.

The inputs @var{x} and @var{y} are the coordinates of the polygon vertices.
If the inputs are matrices then the rows represent different vertices and
each column produces a different polygon.  @code{fill} will close any open
polygons before plotting.

The input @var{c} determines the color of the polygon.  The simplest form
is a single color specification such as a @code{plot} format or an
RGB-triple.  In this case the polygon(s) will have one unique color.  If
@var{c} is a vector or matrix then the color data is first scaled using
@code{clim} and then indexed into the current colormap.  A vector will color
each polygon (a column from matrices @var{x} and @var{y}) with a single
computed color.  A matrix @var{c} of the same size as @var{x} and @var{y}
will compute the color of each vertex and then interpolate the face color
between the vertices.

Multiple property/value pairs for the underlying patch object may be
specified, but they must appear in pairs.  The full list of properties is
documented at @ref{Patch Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to the
created patch objects.

Example: red square

@example
@group
vertices = [0 0
            1 0
            1 1
            0 1];
fill (vertices(:,1), vertices(:,2), "r");
axis ([-0.5 1.5, -0.5 1.5])
axis equal
@end group
@end example

@seealso{patch, fill3, clim, colormap}
@end deftypefn
