# factorial

```octave
function f = factorial (n)
```

@deftypefn {} {@var{f} =} factorial (@var{n})
Return the factorial of @var{n} where @var{n} is a real non-negative
integer.

@c FIXME: This documentation is wrong.  Apparently gamma() is used for
@c        calculations rather than prod().
If @var{n} is a scalar, this is equivalent to @code{prod (1:@var{n})}.  For
vector or matrix arguments, return the factorial of each element in the
array.

For non-integers see the generalized factorial function @code{gamma}.
Note that the factorial function grows large quite quickly, and even
with double precision values overflow will occur if @var{n} > 171.  For
such cases consider @code{gammaln}.
@seealso{prod, gamma, gammaln}
@end deftypefn
