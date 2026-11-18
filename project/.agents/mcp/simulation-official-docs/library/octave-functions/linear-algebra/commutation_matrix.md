# commutation_matrix

```octave
function k = commutation_matrix (m, n)
```

@deftypefn {} {@var{k} =} commutation_matrix (@var{m}, @var{n})
Return the commutation matrix
@tex
 $K_{m,n}$
@end tex
@ifnottex
K(m,n)
@end ifnottex
which is the unique
@tex
 $m n \times m n$
@end tex
@ifnottex
@var{m}*@var{n} by @var{m}*@var{n}
@end ifnottex
matrix such that
@tex
 $K_{m,n} \cdot {\rm vec} (A) = {\rm vec} (A^T)$
@end tex
@ifnottex
@math{K(m,n) * vec(A) = vec(A')}
@end ifnottex
for all
@tex
 $m\times n$
@end tex
@ifnottex
@math{m} by @math{n}
@end ifnottex
matrices
@tex
 $A$.
@end tex
@ifnottex
@math{A}.
@end ifnottex

If only one argument @var{m} is given,
@tex
 $K_{m,m}$
@end tex
@ifnottex
@math{K(m,m)}
@end ifnottex
is returned.

See @nospell{Magnus and Neudecker}, @cite{Matrix Differential
Calculus with Applications in Statistics and Econometrics}, 1988.
@end deftypefn
