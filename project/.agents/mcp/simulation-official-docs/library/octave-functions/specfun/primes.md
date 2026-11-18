# primes

```octave
function p = primes (n)
```

@deftypefn {} {@var{p} =} primes (@var{n})
Return all primes up to @var{n}.

The output data class (double, single, uint32, etc.@:) is the same as the
input class of @var{n}.  The algorithm used is the Sieve of Eratosthenes.

Note: For a specific number @var{n} of primes, call
@code{list_primes (@var{n})}.  Alternatively, call
@code{primes (@var{n}*log (@var{k}*@var{n}))(1:@var{n})} where @var{k} is
about 5 or 6.  This works because the distance from one prime to the next is
proportional to the logarithm of the prime, on average.  On integrating,
there are about @var{n} primes less than @code{@var{n} * log (5*@var{n})}.

@seealso{list_primes, isprime}
@end deftypefn
