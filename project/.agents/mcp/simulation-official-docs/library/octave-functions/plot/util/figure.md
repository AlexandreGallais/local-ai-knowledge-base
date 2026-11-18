# figure

```octave
function h = figure (varargin)
```

@deftypefn  {} {} figure
@deftypefnx {} {} figure @var{n}
@deftypefnx {} {} figure (@var{n})
@deftypefnx {} {} figure (@dots{}, "@var{property}", @var{value}, @dots{})
@deftypefnx {} {@var{h} =} figure (@dots{})
Create a new figure window for plotting.

If no arguments are specified, a new figure with the next available number
is created.

If called with an integer @var{n}, and no such numbered figure exists, then
a new figure with the specified number is created.  If the figure already
exists then it is made visible and becomes the current figure for plotting.

Multiple property-value pairs may be specified for the figure object, but
they must appear in pairs.

The optional return value @var{h} is a graphics handle to the created figure
object.

Programming Note: The full list of properties is documented at
@ref{Figure Properties}.
@seealso{axes, gcf, shg, clf, close}
@end deftypefn
