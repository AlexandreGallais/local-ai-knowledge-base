# reducevolume

```octave
function [nx, ny, nz, nv] = reducevolume (varargin)
```

@deftypefn  {} {[@var{nx}, @var{ny}, @var{nz}, @var{nv}] =} reducevolume (@var{v}, @var{r})
@deftypefnx {} {[@var{nx}, @var{ny}, @var{nz}, @var{nv}] =} reducevolume (@var{x}, @var{y}, @var{z}, @var{v}, @var{r})
@deftypefnx {} {@var{nv} =} reducevolume (@dots{})

Reduce the volume of the dataset in @var{v} according to the values in
@var{r}.

@var{v} is a matrix that is non-singleton in the first 3 dimensions.

@var{r} can either be a vector of 3 elements representing the reduction
factors in the x-, y-, and z-directions or a scalar, in which case the same
reduction factor is used in all three dimensions.

@code{reducevolume} reduces the number of elements of @var{v} by taking
only every @var{r}-th element in the respective dimension.

Optionally, @var{x}, @var{y}, and @var{z} can be supplied to represent the
set of coordinates of @var{v}.  They can either be matrices of the same size
as @var{v} or vectors with sizes according to the dimensions of @var{v}, in
which case they are expanded to matrices
(@pxref{XREFmeshgrid,,@code{meshgrid}}).

If @code{reducevolume} is called with two arguments then @var{x}, @var{y},
and @var{z} are assumed to match the respective indices of @var{v}.

The reduced matrix is returned in @var{nv}.

Optionally, the reduced set of coordinates are returned in @var{nx},
@var{ny}, and @var{nz}, respectively.

Examples:

@example
@group
@var{v} = reshape (1:6*8*4, [6 8 4]);
@var{nv} = reducevolume (@var{v}, [4 3 2]);
@end group
@end example

@example
@group
@var{v} = reshape (1:6*8*4, [6 8 4]);
@var{x} = 1:3:24;  @var{y} = -14:5:11;  @var{z} = linspace (16, 18, 4);
[@var{nx}, @var{ny}, @var{nz}, @var{nv}] = reducevolume (@var{x}, @var{y}, @var{z}, @var{v}, [4 3 2]);
@end group
@end example

@seealso{isosurface, isonormals}
@end deftypefn
