# delaunay

```octave
function tri = delaunay (varargin)
```

@deftypefn  {} {@var{tri} =} delaunay (@var{x}, @var{y})
@deftypefnx {} {@var{tetr} =} delaunay (@var{x}, @var{y}, @var{z})
@deftypefnx {} {@var{tri} =} delaunay (@var{x})
@deftypefnx {} {@var{tri} =} delaunay (@dots{}, @var{options})
Compute the Delaunay triangulation for a 2-D or 3-D set of points.

For 2-D sets, the return value @var{tri} is a set of triangles which
satisfies the Delaunay circum-circle criterion, i.e., no data point from
[@var{x}, @var{y}] is within the circum-circle of the defining triangle.
The set of triangles @var{tri} is a matrix of size [n, 3].  Each row defines
a triangle and the three columns are the three vertices of the triangle.
The value of @code{@var{tri}(i,j)} is an index into @var{x} and @var{y} for
the location of the j-th vertex of the i-th triangle.

For 3-D sets, the return value @var{tetr} is a set of tetrahedrons which
satisfies the Delaunay circum-circle criterion, i.e., no data point from
[@var{x}, @var{y}, @var{z}] is within the circum-circle of the defining
tetrahedron.  The set of tetrahedrons is a matrix of size [n, 4].  Each row
defines a tetrahedron and the four columns are the four vertices of the
tetrahedron.  The value of @code{@var{tetr}(i,j)} is an index into @var{x},
@var{y}, @var{z} for the location of the j-th vertex of the i-th
tetrahedron.

The input @var{x} may also be a matrix with two or three columns where the
first column contains x-data, the second y-data, and the optional third
column contains z-data.

An optional final argument, which must be a string or cell array of strings,
contains options passed to the underlying qhull command.
See the documentation for the Qhull library for details
@url{http://www.qhull.org/html/qh-quick.htm#options}.
The default options are @code{@{"Qt", "Qbb", "Qc"@}}.
If Qhull fails for 2-D input the triangulation is attempted again with
the options @code{@{"Qt", "Qbb", "Qc", "Qz"@}} which may result in
reduced accuracy.

If @var{options} is not present or @code{[]} then the default arguments are
used.  Otherwise, @var{options} replaces the default argument list.
To append user options to the defaults it is necessary to repeat the
default arguments in @var{options}.  Use a null string to pass no arguments.

@example
@group
x = rand (1, 10);
y = rand (1, 10);
tri = delaunay (x, y);
triplot (tri, x, y);
hold on;
plot (x, y, "r*");
axis ([0,1,0,1]);
@end group
@end example
@seealso{delaunayn, convhull, voronoi, triplot, trimesh, tetramesh, trisurf}
@end deftypefn
