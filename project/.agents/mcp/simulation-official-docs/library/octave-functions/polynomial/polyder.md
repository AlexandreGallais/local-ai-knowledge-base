# polyder

```octave
function [q, d] = polyder (p, a)
```

@deftypefn  {} {@var{k} =} polyder (@var{p})
@deftypefnx {} {@var{k} =} polyder (@var{a}, @var{b})
@deftypefnx {} {[@var{q}, @var{d}] =} polyder (@var{b}, @var{a})
Return the coefficients of the derivative of the polynomial whose
coefficients are given by the vector @var{p}.

If a pair of polynomials is given, return the derivative of the product
@math{@var{a}*@var{b}}.

If two inputs and two outputs are given, return the derivative of the
polynomial quotient @math{@var{b}/@var{a}}.  The quotient numerator is
in @var{q} and the denominator in @var{d}.
@seealso{polyint, polyval, polyreduce}
@end deftypefn
