# polyeig

```octave
function [z, v] = polyeig (varargin)
```

@deftypefn  {} {@var{z} =} polyeig (@var{C0}, @var{C1}, @dots{}, @var{Cl})
@deftypefnx {} {[@var{v}, @var{z}] =} polyeig (@var{C0}, @var{C1}, @dots{}, @var{Cl})

Solve the polynomial eigenvalue problem of degree @var{l}.

Given an @var{n}x@var{n} matrix polynomial

@code{@var{C}(@var{s}) = @var{C0} + @var{C1} @var{s} + @dots{} + @var{Cl}
@var{s}^@var{l}}

@code{polyeig} solves the eigenvalue problem

@code{(@var{C0} + @var{C1} @var{z} + @dots{} + @var{Cl} @var{z}^@var{l})
@var{v} = 0}.

Note that the eigenvalues @var{z} are the zeros of the matrix polynomial.
@var{z} is a row vector with @code{@var{n}*@var{l}} elements.  @var{v} is a
matrix (@var{n} x @var{n}*@var{l}) with columns that correspond to the
eigenvectors.

@seealso{eig, eigs, compan}
@end deftypefn
