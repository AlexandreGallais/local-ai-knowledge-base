# plot3

```octave
function h = plot3 (varargin)
```

@deftypefn  {} {} plot3 (@var{x}, @var{y}, @var{z})
@deftypefnx {} {} plot3 (@var{x}, @var{y}, @var{z}, @var{prop}, @var{value}, @dots{})
@deftypefnx {} {} plot3 (@var{x}, @var{y}, @var{z}, @var{fmt})
@deftypefnx {} {} plot3 (@var{x}, @var{cplx})
@deftypefnx {} {} plot3 (@var{cplx})
@deftypefnx {} {} plot3 (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} plot3 (@dots{})
Produce 3-D plots.

Many different combinations of arguments are possible.  The simplest
form is

@example
plot3 (@var{x}, @var{y}, @var{z})
@end example

@noindent
in which the arguments are taken to be the vertices of the points to
be plotted in three dimensions.  If all arguments are vectors of the
same length, then a single continuous line is drawn.  If all arguments
are matrices, then each column of is treated as a separate line.  No attempt
is made to transpose the arguments to make the number of rows match.

If only two arguments are given, as

@example
plot3 (@var{x}, @var{cplx})
@end example

@noindent
the real and imaginary parts of the second argument are used
as the @var{y} and @var{z} coordinates, respectively.

If only one argument is given, as

@example
plot3 (@var{cplx})
@end example

@noindent
the real and imaginary parts of the argument are used as the @var{y}
and @var{z} values, and they are plotted versus their index.

Arguments may also be given in groups of three as

@example
plot3 (@var{x1}, @var{y1}, @var{z1}, @var{x2}, @var{y2}, @var{z2}, @dots{})
@end example

@noindent
in which each set of three arguments is treated as a separate line or
set of lines in three dimensions.

To plot multiple one- or two-argument groups, separate each group
with an empty format string, as

@example
plot3 (@var{x1}, @var{c1}, "", @var{c2}, "", @dots{})
@end example

Multiple property-value pairs may be specified which will affect the line
objects drawn by @code{plot3}.  If the @var{fmt} argument is supplied it will
format the line objects in the same manner as @code{plot}.  The full list of
properties is documented at @ref{Line Properties}.

If the first argument @var{hax} is an axes handle, then plot into this axes,
rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created plot.

Example:

@example
@group
z = [0:0.05:5];
plot3 (cos (2*pi*z), sin (2*pi*z), z, ";helix;");
plot3 (z, exp (2i*pi*z), ";complex sinusoid;");
@end group
@end example
@seealso{ezplot3, plot}
@end deftypefn
