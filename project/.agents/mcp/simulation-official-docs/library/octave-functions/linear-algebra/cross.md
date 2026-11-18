# cross

```octave
function z = cross (x, y, dim)
```

@deftypefn  {} {@var{z} =} cross (@var{x}, @var{y})
@deftypefnx {} {@var{z} =} cross (@var{x}, @var{y}, @var{dim})
Compute the vector cross product of two 3-dimensional vectors @var{x} and
@var{y}.

If @var{x} and @var{y} are arrays, the cross product is applied along the
first dimension with three elements.

The optional argument @var{dim} forces the cross product to be calculated
along the specified dimension.  An error will be produced if the specified
dimension is not three elements in size.

In the case of a complex output, orthogonality of the output with respect
to the inputs is also satisfied, and the condition

@example
@code{dot (conj (@var{z}), @var{x}) @equiv{} dot (conj (@var{z}), @var{y}) = 0}
@end example

@noindent
is met.  @code{dot (@var{z}, @var{x}) = 0} and
@code{dot (@var{z}, @var{y}) = 0} will not hold.  Also note that instead of
using the @code{dot} function, the inner product

@example
@code{@var{z}(:).' * @var{x}(:) @equiv{} @var{z}(:).' * @var{y}(:) = 0}
@end example

@noindent
will meet the orthogonality condition for vector input.

Example Code:

@example
@group
cross ([1, 1, 0], [0, 1, 1])
  @xresult{}
       1  -1   1
@end group
@end example

@example
@group
cross (magic (3), eye (3), 2)
  @xresult{}
       0   6  -1
      -7   0   3
       9  -4   0
@end group
@end example

@seealso{dot, curl, divergence, conj}
@end deftypefn
