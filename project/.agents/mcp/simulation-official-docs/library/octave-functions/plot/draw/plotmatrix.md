# plotmatrix

```octave
function [h, ax, bigax, p, pax] = plotmatrix (varargin)
```

@deftypefn  {} {} plotmatrix (@var{x}, @var{y})
@deftypefnx {} {} plotmatrix (@var{x})
@deftypefnx {} {} plotmatrix (@dots{}, @var{style})
@deftypefnx {} {} plotmatrix (@var{hax}, @dots{})
@deftypefnx {} {[@var{h}, @var{ax}, @var{bigax}, @var{p}, @var{pax}] =} plotmatrix (@dots{})
Scatter plot of the columns of one matrix against another.

Given the arguments @var{x} and @var{y} that have a matching number of
rows, @code{plotmatrix} plots a set of axes corresponding to

@example
plot (@var{x}(:, i), @var{y}(:, j))
@end example

When called with a single argument @var{x} this is equivalent to

@example
plotmatrix (@var{x}, @var{x})
@end example

@noindent
except that the diagonal of the set of axes will be replaced with the
histogram @code{hist (@var{x}(:, i))}.

The marker to use can be changed with the @var{style} argument, that is a
string defining a marker in the same manner as the @code{plot} command.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} provides handles to the individual
graphics objects in the scatter plots, whereas @var{ax} returns the
handles to the scatter plot axes objects.

@var{bigax} is a hidden axes object that surrounds the other axes, such
that the commands @code{xlabel}, @code{title}, etc., will be associated
with this hidden axes.

Finally, @var{p} returns the graphics objects associated with the histogram
and @var{pax} the corresponding axes objects.

Example:

@example
plotmatrix (randn (100, 3), "g+")
@end example

@seealso{scatter, plot}
@end deftypefn
