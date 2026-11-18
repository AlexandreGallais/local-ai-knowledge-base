# factor

```octave
function [pf, n] = factor (q)
```

@deftypefn  {} {@var{pf} =} factor (@var{q})
@deftypefnx {} {[@var{pf}, @var{n}] =} factor (@var{q})
Return the prime factorization of @var{q}.

The prime factorization is defined as @code{prod (@var{pf}) == @var{q}}
where every element of @var{pf} is a prime number.  If @code{@var{q} == 1},
return 1.  The output @var{pf} is of the same numeric class as the input.

With two output arguments, return the unique prime factors @var{pf} and
their multiplicities.  That is,
@code{prod (@var{pf} .^ @var{n}) == @var{q}}.

Implementation Note: If the input @var{q} is @code{single} or @code{double},
then it must not exceed the corresponding @code{flintmax}.  For larger
inputs, cast them to @code{uint64} if they're less than 2^64:

@example
@group
factor (uint64 (18446744073709011493))
   @xresult{}     571111    761213  42431951
@end group
@end example

For even larger inputs, use @code{sym} if you have the Symbolic package
installed and loaded:

@example
@group
factor (sym ('9444733049654361449941'))
   @xresult{} (sym)
              1           1
 1099511627689 ⋅8589934669
@end group
@end example
@seealso{gcd, lcm, isprime, primes}
@end deftypefn
