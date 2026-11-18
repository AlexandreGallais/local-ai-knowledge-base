# tsearchn

```octave
function [idx, p] = tsearchn (x, t, xi)
```

@deftypefn  {} {@var{idx} =} tsearchn (@var{x}, @var{t}, @var{xi})
@deftypefnx {} {[@var{idx}, @var{p}] =} tsearchn (@var{x}, @var{t}, @var{xi})
Find the simplexes enclosing the given points.

@code{tsearchn} is typically used with @code{delaunayn}:
@code{@var{t} = delaunayn (@var{x})} returns a set of simplexes @code{t},
then @code{tsearchn} returns the row index of @var{t} containing each point
of @var{xi}.  For points outside the convex hull, @var{idx} is NaN.

If requested, @code{tsearchn} also returns the barycentric coordinates
@var{p} of the enclosing simplexes.

@seealso{tsearch, dsearchn, delaunayn}
@end deftypefn
