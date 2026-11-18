# krylov

```octave
function [Uret, H, nu] = krylov (A, V, k, eps1, pflg)
```

@deftypefn {} {[@var{u}, @var{h}, @var{nu}] =} krylov (@var{A}, @var{V}, @var{k}, @var{eps1}, @var{pflg})
Construct an orthogonal basis @var{u} of a block Krylov subspace.

The block Krylov subspace has the following form:

@example
[v a*v a^2*v @dots{} a^(k+1)*v]
@end example

@noindent
The construction is made with Householder reflections to guard against loss
of orthogonality.

If @var{V} is a vector, then @var{h} contains the Hessenberg matrix
such that @nospell{@tcode{a*u == u*h+rk*ek'}}, in which
@code{rk = a*u(:,k)-u*h(:,k)}, and @nospell{@tcode{ek'}} is the vector
@code{[0, 0, @dots{}, 1]} of length @var{k}.  Otherwise, @var{h} is
meaningless.

If @var{V} is a vector and @var{k} is greater than @code{length (A) - 1},
then @var{h} contains the Hessenberg matrix such that @code{a*u == u*h}.

The value of @var{nu} is the dimension of the span of the Krylov subspace
(based on @var{eps1}).

If @var{b} is a vector and @var{k} is greater than @var{m-1}, then @var{h}
contains the Hessenberg decomposition of @var{A}.

The optional parameter @var{eps1} is the threshold for zero.  The default
value is 1e-12.

If the optional parameter @var{pflg} is nonzero, row pivoting is used to
improve numerical behavior.  The default value is 0.

Reference: @nospell{A. Hodel, P. Misra}, "Partial Pivoting in the
Computation of Krylov Subspaces of Large Sparse Systems",
@cite{Proceedings of the 42nd IEEE Conference on Decision and Control},
December 2003.
@end deftypefn
