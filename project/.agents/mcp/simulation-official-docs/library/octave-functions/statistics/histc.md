# histc

```octave
function [n, idx] = histc (x, edges, dim)
```

@deftypefn  {} {@var{n} =} histc (@var{x}, @var{edges})
@deftypefnx {} {@var{n} =} histc (@var{x}, @var{edges}, @var{dim})
@deftypefnx {} {[@var{n}, @var{idx}] =} histc (@dots{})
Compute histogram counts.

When @var{x} is a vector, the function counts the number of elements of
@var{x} that fall in the histogram bins defined by @var{edges}.  This
must be a vector of monotonically increasing values that define the edges
of the histogram bins.
@tex
$n(k)$
@end tex
@ifnottex
@code{@var{n}(k)}
@end ifnottex
contains the number of elements in @var{x} for which
@tex
$@var{edges}(k) <= @var{x} < @var{edges}(k+1)$.
@end tex
@ifnottex
@code{@var{edges}(k) <= @var{x} < @var{edges}(k+1)}.
@end ifnottex
The final element of @var{n} contains the number of elements of @var{x}
exactly equal to the last element of @var{edges}.

When @var{x} is an @math{N}-dimensional array, the computation is carried
out along dimension @var{dim}.  If not specified @var{dim} defaults to the
first non-singleton dimension.

When a second output argument is requested an index matrix is also returned.
The @var{idx} matrix has the same size as @var{x}.  Each element of
@var{idx} contains the index of the histogram bin in which the
corresponding element of @var{x} was counted.
@seealso{hist}
@end deftypefn
