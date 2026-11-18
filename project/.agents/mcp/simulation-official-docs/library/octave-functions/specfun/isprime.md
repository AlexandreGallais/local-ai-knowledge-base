# isprime

```octave
function tf = isprime (x)
```

@deftypefn {} {@var{tf} =} isprime (@var{x})
Return a logical array which is true where the elements of @var{x} are prime
numbers and false where they are not.

A prime number is conventionally defined as a positive integer greater than
1 (e.g., 2, 3, @dots{}) which is divisible only by itself and 1.  Octave
extends this definition to include both negative integers and complex
values.  A negative integer is prime if its positive counterpart is prime.
This is equivalent to @code{isprime (abs (x))}.

If @code{class (@var{x})} is complex, then primality is tested in the domain
of Gaussian integers (@url{https://en.wikipedia.org/wiki/Gaussian_integer}).
Some non-complex integers are prime in the ordinary sense, but not in the
domain of Gaussian integers.  For example, @math{5 = (1+2i)*(1-2i)} shows
that 5 is not prime because it has a factor other than itself and 1.
Exercise caution when testing complex and real values together in the same
matrix.

Examples:

@example
@group
isprime (1:6)
  @xresult{}  0  1  1  0  1  0
@end group
@end example

@example
@group
isprime ([i, 2, 3, 5])
  @xresult{}  0  0  1  0
@end group
@end example

Programming Note: @code{isprime} is suitable for all @var{x}
in the range abs(@var{x})
@tex
$ < 2^{64}$.
@end tex
@ifnottex
 < 2^64.
@end ifnottex
Cast inputs larger than @code{flintmax} to @code{uint64}.

For larger inputs, use ‘sym’ if you have the Symbolic package installed
and loaded:

@example
@group
isprime (sym ('58745389709258902525390450') + (0:4))
   @xresult{}  0  1  0  0  0
@end group
@end example

Compatibility Note: @sc{matlab} does not extend the definition of prime
numbers and will produce an error if given negative or complex inputs.
@seealso{primes, factor, gcd, lcm}
@end deftypefn
