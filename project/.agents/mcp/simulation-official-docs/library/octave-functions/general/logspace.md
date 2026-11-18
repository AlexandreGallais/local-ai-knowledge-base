# logspace

```octave
function y = logspace (a, b, n = 50)
```

@deftypefn  {} {@var{y} =} logspace (@var{a}, @var{b})
@deftypefnx {} {@var{y} =} logspace (@var{a}, @var{b}, @var{n})
@deftypefnx {} {@var{y} =} logspace (@var{a}, pi)
@deftypefnx {} {@var{y} =} logspace (@var{a}, pi, @var{n})
Return a row vector with @var{n} elements logarithmically spaced from
@tex
$10^{a}$ to $10^{b}$.
@end tex
@ifnottex
10^@var{a} to 10^@var{b}.
@end ifnottex

If the number of elements @var{n} is unspecified it defaults to 50.

If @var{b} is equal to
@tex
$\pi$,
@end tex
@ifnottex
pi,
@end ifnottex
the points are between
@tex
$10^{a}$ and $\pi$,
@end tex
@ifnottex
10^@var{a} and pi,
@end ifnottex
@emph{not}
@tex
$10^{a}$ and $10^{\pi}$,
@end tex
@ifnottex
10^@var{a} and 10^pi,
@end ifnottex
which is useful in digital signal processing.

Programming Notes: For compatibility with @sc{matlab}, return the right-hand
side of the range
@tex
($10^{b}$)
@end tex
@ifnottex
(10^@var{b})
@end ifnottex
when a single value (@var{n} = 1) is requested.
If @var{n} is not an integer then @code{floor (@var{n})} is used to round
the number of elements.  If @var{n} is zero or negative then an empty 1x0
matrix is returned.
@seealso{linspace}
@end deftypefn
