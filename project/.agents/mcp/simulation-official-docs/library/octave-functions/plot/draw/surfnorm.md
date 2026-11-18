# surfnorm

```octave
function [Nx, Ny, Nz] = surfnorm (varargin)
```

@deftypefn  {} {} surfnorm (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} surfnorm (@var{z})
@deftypefnx {} {} surfnorm (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} surfnorm (@var{hax}, @dots{})
@deftypefnx {} {[@var{Nx}, @var{Ny}, @var{Nz}] =} surfnorm (@dots{})
Find the vectors normal to a meshgridded surface.

If @var{x} and @var{y} are vectors, then a typical vertex is
(@var{x}(j), @var{y}(i), @var{z}(i,j)).  Thus, columns of @var{z} correspond
to different @var{x} values and rows of @var{z} correspond to different
@var{y} values.  If only a single input @var{z} is given then @var{x} is
taken to be @code{1:columns (@var{z})} and @var{y} is
@code{1:rows (@var{z})}.

If no return arguments are requested, a surface plot with the normal
vectors to the surface is plotted.

Any property/value input pairs are assigned to the surface object.  The full
list of properties is documented at @ref{Surface Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If output arguments are requested then the components of the normal
vectors are returned in @var{Nx}, @var{Ny}, and @var{Nz} and no plot is
made.  The normal vectors are unnormalized (magnitude != 1).  To normalize,
use

@example
@group
len = sqrt (nx.^2 + ny.^2 + nz.^2);
nx ./= len;  ny ./= len;  nz ./= len;
@end group
@end example

An example of the use of @code{surfnorm} is

@example
surfnorm (peaks (25));
@end example

Algorithm: The normal vectors are calculated by taking the cross product
of the diagonals of each of the quadrilateral faces in the meshgrid to find
the normal vectors at the center of each face.  Next, for each meshgrid
point the four nearest normal vectors are averaged to obtain the final
normal to the surface at the meshgrid point.

For surface objects, the @qcode{"VertexNormals"} property contains
equivalent information, except possibly near the boundary of the surface
where different interpolation schemes may yield slightly different values.

@seealso{isonormals, quiver3, surf, meshgrid}
@end deftypefn
