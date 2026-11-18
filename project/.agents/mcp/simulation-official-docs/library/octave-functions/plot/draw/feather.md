# feather

```octave
function h = feather (varargin)
```

@deftypefn  {} {} feather (@var{u}, @var{v})
@deftypefnx {} {} feather (@var{z})
@deftypefnx {} {} feather (@dots{}, @var{style})
@deftypefnx {} {} feather (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} feather (@dots{})

Plot the @code{(@var{u}, @var{v})} components of a vector field emanating
from equidistant points on the x-axis.

If a single complex argument @var{z} is given, then
@code{@var{u} = real (@var{z})} and @code{@var{v} = imag (@var{z})}.

The style to use for the plot can be defined with a line style @var{style}
of the same format as the @code{plot} command.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to the
line objects representing the drawn vectors.

@example
@group
phi = [0 : 15 : 360] * pi/180;
feather (sin (phi), cos (phi));
@end group
@end example

@seealso{plot, quiver, compass}
@end deftypefn
