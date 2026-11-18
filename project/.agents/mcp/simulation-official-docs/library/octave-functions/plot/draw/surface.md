# surface

```octave
function h = surface (varargin)
```

@deftypefn  {} {} surface (@var{x}, @var{y}, @var{z}, @var{c})
@deftypefnx {} {} surface (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} surface (@var{z}, @var{c})
@deftypefnx {} {} surface (@var{z})
@deftypefnx {} {} surface (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} surface (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} surface (@dots{})
Create a surface graphic object given matrices @var{x} and @var{y} from
@code{meshgrid} and a matrix of values @var{z} corresponding to the
@var{x} and @var{y} coordinates of the surface.

If @var{x} and @var{y} are vectors, then a typical vertex is
(@var{x}(j), @var{y}(i), @var{z}(i,j)).  Thus, columns of @var{z} correspond
to different @var{x} values and rows of @var{z} correspond to different
@var{y} values.  If only a single input @var{z} is given then @var{x} is
taken to be @code{1:columns (@var{z})} and @var{y} is
@code{1:rows (@var{z})}.

Any property/value input pairs are assigned to the surface object.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created
surface object.

Programming Note: The full list of properties is documented at
@ref{Surface Properties}.
@seealso{surf, mesh, patch, line}
@end deftypefn
