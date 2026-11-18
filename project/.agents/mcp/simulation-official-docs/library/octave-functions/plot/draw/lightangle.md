# lightangle

```octave
function varargout = lightangle (varargin)
```

@deftypefn  {} {} lightangle (@var{az}, @var{el})
@deftypefnx {} {} lightangle (@var{hax}, @var{az}, @var{el})
@deftypefnx {} {} lightangle (@var{hl}, @var{az}, @var{el})
@deftypefnx {} {@var{hl} =} lightangle (@dots{})
@deftypefnx {} {[@var{az}, @var{el}] =} lightangle (@var{hl})
Add a light object to the current axes using spherical coordinates.

The light position is specified by an azimuthal rotation @var{az} and an
elevation angle @var{el}, both in degrees.

If the first argument @var{hax} is an axes handle, then create a new light
object in this axes, rather than the current axes returned by @code{gca}.

If the first argument @var{hl} is a handle to a light object, then act on
this light object rather than creating a new object.

The optional return value @var{hl} is a graphics handle to the light object.

Example:

Add a light object to a plot

@example
@group
@c doctest: +SKIP
clf;
sphere (36);
lightangle (45, 30);
@end group
@end example

@seealso{light, view, camlight}
@end deftypefn
