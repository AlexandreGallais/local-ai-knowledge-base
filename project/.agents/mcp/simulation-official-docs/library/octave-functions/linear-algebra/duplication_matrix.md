# duplication_matrix

```octave
function d = duplication_matrix (n)
```

@deftypefn {} {@var{d} =} duplication_matrix (@var{n})
Return the duplication matrix
@tex
 $D_n$
@end tex
@ifnottex
@nospell{@math{Dn}}
@end ifnottex
which is the unique
@tex
 $n^2 \times n(n+1)/2$
@end tex
@ifnottex
@math{N^2}-by-@math{N*(N+1)/2}
@end ifnottex
matrix such that
@tex
 $D_n * {\rm vech} (A) = {\rm vec} (A)$
@end tex
@ifnottex
@nospell{@code{Dn * vech (A) = vec (A)}}
@end ifnottex
for all symmetric
@tex
 $n \times n$
@end tex
@ifnottex
@math{N}-by-@math{N}
@end ifnottex
matrices
@tex
 $A$.
@end tex
@ifnottex
@math{A}.
@end ifnottex

See @nospell{Magnus and Neudecker}, @cite{Matrix Differential Calculus with
Applications in Statistics and Econometrics}, 1988.
@end deftypefn
