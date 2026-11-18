# invhilb

```octave
function hinv = invhilb (n)
```

@deftypefn {} {@var{hinv} =} invhilb (@var{n})
Return the inverse of the Hilbert matrix of order @var{n}.

This can be computed exactly using
@tex
$$\eqalign{
  A_{ij} &= -1^{i+j} (i+j-1)
             \left( \matrix{n+i-1 \cr n-j } \right)
             \left( \matrix{n+j-1 \cr n-i } \right)
             \left( \matrix{i+j-2 \cr i-2 } \right)^2 \cr
         &= { p(i)p(j) \over (i+j-1) }
}$$
where
$$
  p(k) = -1^k \left( \matrix{ k+n-1 \cr k-1 } \right)
              \left( \matrix{ n \cr k } \right)
$$
@end tex
@ifnottex

@example
@group

           (i+j)         /n+i-1\  /n+j-1\   /i+j-2\ 2
A(i,j) = -1      (i+j-1)(       )(       ) (       )
                         \ n-j /  \ n-i /   \ i-2 /

       = p(i) p(j) / (i+j-1)

@end group
@end example

@noindent
where

@example
@group
         k  /k+n-1\   /n\
p(k) = -1  (       ) (   )
            \ k-1 /   \k/
@end group
@end example

@end ifnottex
The validity of this formula can easily be checked by expanding the binomial
coefficients in both formulas as factorials.  It can be derived more
directly via the theory of Cauchy matrices.  See @nospell{J. W. Demmel},
@cite{Applied Numerical Linear Algebra}, @w{p.@: 92}.

Compare this with the numerical calculation of @code{inv (hilb (n))}, which
suffers from the ill-conditioning of the Hilbert matrix, and the finite
precision of your computer's floating point arithmetic.
@seealso{hilb}
@end deftypefn
