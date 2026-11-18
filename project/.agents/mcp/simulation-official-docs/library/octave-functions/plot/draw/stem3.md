# stem3

```octave
function h = stem3 (varargin)
```

@deftypefn  {} {} stem3 (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} stem3 (@dots{}, @var{linespec})
@deftypefnx {} {} stem3 (@dots{}, "filled")
@deftypefnx {} {} stem3 (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} stem3 (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} stem3 (@dots{})
Plot a 3-D stem graph.

Stems are drawn from the height @var{z} to the location in the x-y plane
determined by @var{x} and @var{y}.  The default color is @qcode{"b"} (blue),
the default line style is @qcode{"-"}, and the default marker is
@qcode{"o"}.

The line style can be altered by the @var{linespec} argument in the same
manner as the @code{plot} command.  If the @qcode{"filled"} argument is
present the markers at the top of the stems will be filled in.

Optional property/value pairs may be specified to control the appearance
of the plot.  The full list of properties is documented at
@ref{Line Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a handle to the @nospell{"stem series"}
hggroup containing the line and marker objects used for the plot.
@xref{XREFstem,,stem}, for a description of the @nospell{"stem series"}
object.

Example:

@example
@group
theta = 0:0.2:6;
stem3 (cos (theta), sin (theta), theta);
@end group
@end example

@noindent
plots 31 stems with heights from 0 to 6 lying on a circle.

Implementation Note: Color definitions with RGB-triples are not valid.
@seealso{stem, bar, hist, plot}
@end deftypefn
