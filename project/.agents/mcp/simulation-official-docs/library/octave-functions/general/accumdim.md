# accumdim

```octave
function A = accumdim (subs, vals, dim, n = 0, fcn = [], fillval = 0)
```

@deftypefn  {} {@var{A} =} accumdim (@var{subs}, @var{vals})
@deftypefnx {} {@var{A} =} accumdim (@var{subs}, @var{vals}, @var{dim})
@deftypefnx {} {@var{A} =} accumdim (@var{subs}, @var{vals}, @var{dim}, @var{n})
@deftypefnx {} {@var{A} =} accumdim (@var{subs}, @var{vals}, @var{dim}, @var{n}, @var{fcn})
@deftypefnx {} {@var{A} =} accumdim (@var{subs}, @var{vals}, @var{dim}, @var{n}, @var{fcn}, @var{fillval})
Create an array by accumulating the slices of an array into the
positions defined by their subscripts along a specified dimension.

The subscripts are defined by the index vector @var{subs}.
The dimension is specified by @var{dim}.  If not given, it defaults
to the first non-singleton dimension.  The length of @var{subs} must
be equal to @code{size (@var{vals}, @var{dim})}.

The extent of the result matrix in the working dimension will be
determined by the subscripts themselves.  However, if @var{n} is
defined it determines this extent.

The default action of @code{accumdim} is to sum the subarrays with the
same subscripts.  This behavior can be modified by defining the
@var{fcn} function.  This should be a function or function handle
that accepts an array and a dimension, and reduces the array along
this dimension.  As a special exception, the built-in @code{min} and
@code{max} functions can be used directly, and @code{accumdim}
accounts for the middle empty argument that is used in their calling.

The slices of the returned array that have no subscripts associated
with them are set to zero.  Defining @var{fillval} to some other
value allows these values to be defined.

An example of the use of @code{accumdim} is:

@example
@group
accumdim ([1, 2, 1, 2, 1], [ 7, -10,   4;
                            -5, -12,   8;
                           -12,   2,   8;
                           -10,   9,  -3;
                            -5,  -3, -13])
@xresult{} [-10,-11,-1;-15,-3,5]
@end group
@end example

@seealso{accumarray}
@end deftypefn
