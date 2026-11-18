# stairs

```octave
function [xstep, ystep] = stairs (varargin)
```

@deftypefn  {} {} stairs (@var{y})
@deftypefnx {} {} stairs (@var{x}, @var{y})
@deftypefnx {} {} stairs (@dots{}, @var{style})
@deftypefnx {} {} stairs (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} stairs (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} stairs (@dots{})
@deftypefnx {} {[@var{xstep}, @var{ystep}] =} stairs (@dots{})
Produce a stairstep plot.

The arguments @var{x} and @var{y} may be vectors or matrices.
If only one argument is given, it is taken as a vector of Y values
and the X coordinates are taken to be the indices of the elements
(@code{@var{x} = 1:numel (@var{y})}).

The style to use for the plot can be defined with a line style @var{style}
of the same format as the @code{plot} command.

Multiple property/value pairs may be specified, but they must appear in
pairs.  The full list of properties is documented at @ref{Line Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

If one output argument is requested, return a graphics handle to the
created plot.  If two output arguments are specified, the data are generated
but not plotted.  For example,

@example
stairs (x, y);
@end example

@noindent
and

@example
@group
[xs, ys] = stairs (x, y);
plot (xs, ys);
@end group
@end example

@noindent
are equivalent.
@seealso{bar, hist, plot, stem}
@end deftypefn
