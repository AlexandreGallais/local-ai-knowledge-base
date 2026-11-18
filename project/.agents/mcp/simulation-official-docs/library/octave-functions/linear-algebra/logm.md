# logm

```octave
function [s, iters] = logm (A, opt_iters = 100)
```

@deftypefn  {} {@var{s} =} logm (@var{A})
@deftypefnx {} {@var{s} =} logm (@var{A}, @var{opt_iters})
@deftypefnx {} {[@var{s}, @var{iters}] =} logm (@dots{})
Compute the matrix logarithm of the square matrix @var{A}.

The implementation utilizes a Pad@'e approximant and the identity

@example
logm (@var{A}) = 2^k * logm (@var{A}^(1 / 2^k))
@end example

The optional input @var{opt_iters} is the maximum number of square roots
to compute and defaults to 100.

The optional output @var{iters} is the number of square roots actually
computed.
@seealso{expm, sqrtm}
@end deftypefn
