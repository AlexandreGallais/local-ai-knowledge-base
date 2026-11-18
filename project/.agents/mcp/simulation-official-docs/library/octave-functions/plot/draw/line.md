# line

```octave
function h = line (varargin)
```

@deftypefn  {} {} line ()
@deftypefnx {} {} line (@var{x}, @var{y})
@deftypefnx {} {} line (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} line ("xdata", @var{x}, "ydata", @var{y})
@deftypefnx {} {} line ("xdata", @var{x}, "ydata", @var{y}, "zdata", @var{z})
@deftypefnx {} {} line (@dots{}, @var{property}, @var{value})
@deftypefnx {} {} line (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} line (@dots{})
Create a line object from @var{x} and @var{y} (and possibly @var{z}) and
insert it in the current axes.

In the standard calling form the data @var{x}, @var{y}, and @var{z} may be
scalars, vectors, or matrices.  In the case of matrix inputs, @code{line}
will attempt to orient scalars and vectors so the results can be plotted.
This requires that one of the dimensions of the vector match either the
number of rows or the number of columns of the matrix.

In the low-level calling form (50% higher performance) where the data is
specified by name (@code{line ("xdata", @var{x}, @dots{})}) the data must be
vectors.  If no data is specified (@code{line ()}) then
@w{@code{@var{x} == @var{y} = [0, 1]}}.

Multiple property-value pairs may be specified for the line object, but they
must appear in pairs.

If called with only @var{property}/@var{value} pairs then any unspecified
properties use their default values as specified on the root object.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle (or vector of
handles) to the line objects created.

Programming Note: The full list of properties is documented at
@ref{Line Properties}.

The function @code{line} differs from @code{plot} in that line objects are
inserted in to the current axes without first clearing the plot.
@seealso{image, patch, rectangle, surface, text}
@end deftypefn
