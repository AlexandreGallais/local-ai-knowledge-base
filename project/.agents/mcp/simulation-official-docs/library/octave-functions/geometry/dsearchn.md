# dsearchn

```octave
function [idx, d] = dsearchn (x, tri, xi, outval)
```

@deftypefn  {} {@var{idx} =} dsearchn (@var{x}, @var{tri}, @var{xi})
@deftypefnx {} {@var{idx} =} dsearchn (@var{x}, @var{tri}, @var{xi}, @var{outval})
@deftypefnx {} {@var{idx} =} dsearchn (@var{x}, @var{xi})
@deftypefnx {} {[@var{idx}, @var{d}] =} dsearchn (@dots{})
Return the index @var{idx} of the closest point in @var{x} to the elements
@var{xi}.

If @var{outval} is supplied, then the values of @var{xi} that are not
contained within one of the simplices @var{tri} are set to @var{outval}.
Generally, @var{tri} is returned from @code{delaunayn (@var{x})}.

The optional output @var{d} contains a column vector of distances between
the query points @var{xi} and the nearest simplex points @var{x}.

Compatibility note: The @code{dsearchn} algorithm only uses the input
@var{tri} when @var{outdim} is specified to determine if any points lie
outside of the triangulation region.  For compatibility, @var{tri} is
accepted as an input even when @var{outdim} is not specified, but it is not
used or checked to be a valid triangulation, and providing it will not
affect either the output @var{idx} or the calculation efficiency.

@seealso{tsearchn, delaunayn}
@end deftypefn
