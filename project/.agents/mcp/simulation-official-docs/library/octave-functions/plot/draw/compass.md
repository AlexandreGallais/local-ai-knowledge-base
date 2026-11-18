# compass

```octave
function h = compass (varargin)
```

@deftypefn  {} {} compass (@var{u}, @var{v})
@deftypefnx {} {} compass (@var{z})
@deftypefnx {} {} compass (@dots{}, @var{style})
@deftypefnx {} {} compass (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} compass (@dots{})

Plot the @code{(@var{u}, @var{v})} components of a vector field emanating
from the origin of a polar plot.

The arrow representing each vector has one end at the origin and the tip at
[@var{u}(i), @var{v}(i)].  If a single complex argument @var{z} is given,
then @code{@var{u} = real (@var{z})} and @code{@var{v} = imag (@var{z})}.

The style to use for the plot can be defined with a line style @var{style}
of the same format as the @code{plot} command.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a vector of graphics handles to the
line objects representing the drawn vectors.

@example
@group
a = toeplitz ([1;randn(9,1)], [1,randn(1,9)]);
compass (eig (a));
@end group
@end example

@seealso{polar, feather, quiver, rose, plot}
@end deftypefn
