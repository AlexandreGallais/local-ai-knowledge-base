# kendall

```octave
function tau = kendall (x, y = [])
```

@deftypefn  {} {@var{tau} =} kendall (@var{x})
@deftypefnx {} {@var{tau} =} kendall (@var{x}, @var{y})
@cindex Kendall's Tau
Compute Kendall's
@tex
$\tau$.
@end tex
@ifnottex
@var{tau}.
@end ifnottex

For two data vectors @var{x}, @var{y} of common length @math{N}, Kendall's
@tex
$\tau$
@end tex
@ifnottex
@var{tau}
@end ifnottex
is the correlation of the signs of all rank differences of
@var{x} and @var{y}; i.e., if both @var{x} and @var{y} have distinct
entries, then
@tex
$$ \tau = {1 \over N(N-1)} \sum_{i,j} {\rm sign}(q_i-q_j) \, {\rm sign}(r_i-r_j) $$
@end tex
@ifnottex

@example
@group
         1
@var{tau} = -------   SUM sign (@var{q}(i) - @var{q}(j)) * sign (@var{r}(i) - @var{r}(j))
      N (N-1)   i,j
@end group
@end example

@end ifnottex
@noindent
in which the
@tex
$q_i$ and $r_i$
@end tex
@ifnottex
@var{q}(i) and @var{r}(i)
@end ifnottex
are the ranks of @var{x} and @var{y}, respectively.

If @var{x} and @var{y} are drawn from independent distributions,
Kendall's
@tex
$\tau$
@end tex
@ifnottex
@var{tau}
@end ifnottex
is asymptotically normal with mean 0 and variance
@tex
${2 (2N+5) \over 9N(N-1)}$.
@end tex
@ifnottex
@code{(2 * (2N+5)) / (9 * N * (N-1))}.
@end ifnottex

@code{kendall (@var{x})} is equivalent to @code{kendall (@var{x},
@var{x})}.
@seealso{ranks, spearman}
@end deftypefn
