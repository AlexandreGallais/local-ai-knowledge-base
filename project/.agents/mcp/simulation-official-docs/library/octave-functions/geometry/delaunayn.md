# delaunayn

```octave
function T = delaunayn (pts, varargin)
```

@deftypefn  {} {@var{T} =} delaunayn (@var{pts})
@deftypefnx {} {@var{T} =} delaunayn (@var{pts}, @var{options})
Compute the Delaunay triangulation for an N-dimensional set of points.

The Delaunay triangulation is a tessellation of the convex hull of a set of
points such that no N-sphere defined by the N-triangles contains any other
points from the set.

The input matrix @var{pts} of size [n, dim] contains n points in a space of
dimension dim.  The return matrix @var{T} has size [m, dim+1].  Each row of
@var{T} contains a set of indices back into the original set of points
@var{pts} which describes a simplex of dimension dim.  For example, a 2-D
simplex is a triangle and 3-D simplex is a tetrahedron.

An optional second argument, which must be a string or cell array of
strings, contains options passed to the underlying qhull command.  See the
documentation for the Qhull library for details
@url{http://www.qhull.org/html/qh-quick.htm#options}.
The default options depend on the dimension of the input:

@itemize
@item 2-D and 3-D: @var{options} = @code{@{"Qt", "Qbb", "Qc"@}}

@item 4-D and higher: @var{options} = @code{@{"Qt", "Qbb", "Qc", "Qx"@}}
@end itemize

If Qhull fails for 2-D input the triangulation is attempted again with
the options @code{@{"Qt", "Qbb", "Qc", "Qz"@}} which may result in
reduced accuracy.

If @var{options} is not present or @code{[]} then the default arguments are
used.  Otherwise, @var{options} replaces the default argument list.
To append user options to the defaults it is necessary to repeat the
default arguments in @var{options}.  Use a null string to pass no arguments.

@seealso{delaunay, convhulln, voronoin, trimesh, tetramesh}
@end deftypefn
