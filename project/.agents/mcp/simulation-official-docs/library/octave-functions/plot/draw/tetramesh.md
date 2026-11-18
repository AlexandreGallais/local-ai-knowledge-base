# tetramesh

```octave
function h = tetramesh (varargin)
```

@deftypefn  {} {} tetramesh (@var{T}, @var{X})
@deftypefnx {} {} tetramesh (@var{T}, @var{X}, @var{C})
@deftypefnx {} {} tetramesh (@dots{}, @var{property}, @var{val}, @dots{})
@deftypefnx {} {@var{h} =} tetramesh (@dots{})
Display the tetrahedrons defined in the m-by-4 matrix @var{T} as 3-D
patches.

@var{T} is typically the output of a Delaunay triangulation of a 3-D set
of points.  Every row of @var{T} contains four indices into the n-by-3
matrix @var{X} of the vertices of a tetrahedron.  Every row in @var{X}
represents one point in 3-D space.

The vector @var{C} specifies the color of each tetrahedron as an index
into the current colormap.  The default value is 1:m where m is the number
of tetrahedrons; the indices are scaled to map to the full range of the
colormap.  If there are more tetrahedrons than colors in the colormap then
the values in @var{C} are cyclically repeated.

Calling @code{tetramesh (@dots{}, "property", "value", @dots{})} passes all
property/value pairs directly to the patch function as additional arguments.
The full list of properties is documented at @ref{Patch Properties}.

The optional return value @var{h} is a vector of patch handles where each
handle represents one tetrahedron in the order given by @var{T}.
A typical use case for @var{h} is to turn the respective patch
@qcode{"visible"} property @qcode{"on"} or @qcode{"off"}.

Type @code{demo tetramesh} to see examples on using @code{tetramesh}.
@seealso{trimesh, delaunay, delaunayn, patch}
@end deftypefn
