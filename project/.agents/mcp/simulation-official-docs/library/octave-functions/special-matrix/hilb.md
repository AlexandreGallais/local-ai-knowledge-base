# hilb

```octave
function h = hilb (n)
```

@deftypefn {} {@var{h} =} hilb (@var{n})
Return the Hilbert matrix of order @var{n}.

The @math{i,j} element of a Hilbert matrix is defined as
@tex
$$
H(i, j) = {1 \over (i + j - 1)}
$$
@end tex
@ifnottex

@example
H(i, j) = 1 / (i + j - 1)
@end example

@end ifnottex

Hilbert matrices are close to being singular which make them difficult to
invert with numerical routines.  Comparing the condition number of a random
matrix 5x5 matrix with that of a Hilbert matrix of order 5 reveals just how
difficult the problem is.

@example
@group
cond (rand (5))
   @xresult{} 14.392
cond (hilb (5))
   @xresult{} 4.7661e+05
@end group
@end example

@seealso{invhilb}
@end deftypefn
