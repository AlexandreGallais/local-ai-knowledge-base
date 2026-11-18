# spearman

```octave
function rho = spearman (x, y = [])
```

@deftypefn  {} {@var{rho} =} spearman (@var{x})
@deftypefnx {} {@var{rho} =} spearman (@var{x}, @var{y})
@cindex Spearman's Rho
Compute Spearman's rank correlation coefficient
@tex
$\rho$.
@end tex
@ifnottex
@var{rho}.
@end ifnottex

For two data vectors @var{x} and @var{y}, Spearman's
@tex
$\rho$
@end tex
@ifnottex
@var{rho}
@end ifnottex
is the correlation coefficient of the ranks of @var{x} and @var{y}.

If @var{x} and @var{y} are drawn from independent distributions,
@tex
$\rho$
@end tex
@ifnottex
@var{rho}
@end ifnottex
has zero mean and variance
@tex
$1 / (N - 1)$,
@end tex
@ifnottex
@code{1 / (N - 1)},
@end ifnottex
where @math{N} is the length of the @var{x} and @var{y} vectors, and is
asymptotically normally distributed.

@code{spearman (@var{x})} is equivalent to
@code{spearman (@var{x}, @var{x})}.
@seealso{ranks, kendall}
@end deftypefn
