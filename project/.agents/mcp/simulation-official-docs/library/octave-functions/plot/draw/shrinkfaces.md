# shrinkfaces

```octave
function [nf, nv] = shrinkfaces (varargin)
```

@deftypefn  {} {} shrinkfaces (@var{p}, @var{sf})
@deftypefnx {} {@var{nfv} =} shrinkfaces (@var{p}, @var{sf})
@deftypefnx {} {@var{nfv} =} shrinkfaces (@var{fv}, @var{sf})
@deftypefnx {} {@var{nfv} =} shrinkfaces (@var{f}, @var{v}, @var{sf})
@deftypefnx {} {[@var{nf}, @var{nv}] =} shrinkfaces (@dots{})

Reduce the size of faces in a patch by the shrink factor @var{sf}.

The patch object can be specified by a graphics handle (@var{p}), a patch
structure (@var{fv}) with the fields @qcode{"faces"} and @qcode{"vertices"},
or as two separate matrices (@var{f}, @var{v}) of faces and vertices.

The shrink factor @var{sf} is a positive number specifying the percentage
of the original area the new face will occupy.  If no factor is given the
default is 0.3 (a reduction to 30% of the original size).  A factor greater
than 1.0 will result in the expansion of faces.

Given a patch handle as the first input argument and no output parameters,
perform the shrinking of the patch faces in place and redraw the patch.

If called with one output argument, return a structure with fields
@qcode{"faces"}, @qcode{"vertices"}, and @qcode{"facevertexcdata"}
containing the data after shrinking.  This structure can be used directly
as an input argument to the @code{patch} function.

@strong{Caution:}: Performing the shrink operation on faces which are not
convex can lead to undesirable results.

Example: a triangulated 3/4 circle and the corresponding shrunken version.

@example
@group
[phi r] = meshgrid (linspace (0, 1.5*pi, 16), linspace (1, 2, 4));
tri = delaunay (phi(:), r(:));
v = [r(:).*sin(phi(:)) r(:).*cos(phi(:))];
clf ()
p = patch ("Faces", tri, "Vertices", v, "FaceColor", "none");
fv = shrinkfaces (p);
patch (fv)
axis equal
grid on
@end group
@end example

@seealso{patch}
@end deftypefn
