# contourc

```octave
function [c, lev] = contourc (varargin)
```

@deftypefn  {} {@var{c} =} contourc (@var{z})
@deftypefnx {} {@var{c} =} contourc (@var{z}, @var{vn})
@deftypefnx {} {@var{c} =} contourc (@var{x}, @var{y}, @var{z})
@deftypefnx {} {@var{c} =} contourc (@var{x}, @var{y}, @var{z}, @var{vn})
@deftypefnx {} {[@var{c}, @var{lev}] =} contourc (@dots{})
Compute contour lines (isolines of constant Z value).

The matrix @var{z} contains height values above the rectangular grid
determined by @var{x} and @var{y}.  If only a single input @var{z} is
provided then @var{x} is taken to be @code{1:columns (@var{z})} and @var{y}
is taken to be @code{1:rows (@var{z})}.  The minimum data size is 2x2.

The optional input @var{vn} is either a scalar denoting the number of
contour lines to compute or a vector containing the Z values where lines
will be computed.  When @var{vn} is a vector the number of contour lines
is @code{numel (@var{vn})}.  However, to compute a single contour line
at a given value use @code{@var{vn} = [val, val]}.  If @var{vn} is omitted
it defaults to 10.

The return value @var{c} is a 2x@var{n} matrix containing the contour lines
in the following format

@example
@group
@var{c} = [lev1, x1, x2, @dots{}, levn, x1, x2, ...
     len1, y1, y2, @dots{}, lenn, y1, y2, @dots{}]
@end group
@end example

@noindent
in which contour line @var{n} has a level (height) of @var{levn} and length
of @var{lenn}.

The optional return value @var{lev} is a vector with the Z values of the
contour levels.

Example:

@smallexample
@group
x = 0:2;
y = x;
z = x' * y;
c = contourc (x, y, z, 2:3)
  @xresult{} c =
        2.0000   1.0000   1.0000   2.0000   2.0000   3.0000   1.5000   2.0000
        4.0000   2.0000   2.0000   1.0000   1.0000   2.0000   2.0000   1.5000
@end group
@end smallexample
@seealso{contour, contourf, contour3, clabel}
@end deftypefn
