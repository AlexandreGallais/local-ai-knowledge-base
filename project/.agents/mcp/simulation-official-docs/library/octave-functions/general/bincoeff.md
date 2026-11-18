# bincoeff

```octave
function b = bincoeff (n, k)
```

@deftypefn {} {@var{b} =} bincoeff (@var{n}, @var{k})
Return the binomial coefficient of @var{n} and @var{k}.

The binomial coefficient is defined as
@tex
$$
 {n \choose k} = {n (n-1) (n-2) \cdots (n-k+1) \over k!}
$$
@end tex
@ifnottex

@example
@group
 /   \
 | n |    n (n-1) (n-2) @dots{} (n-k+1)
 |   |  = -------------------------
 | k |               k!
 \   /
@end group
@end example

@end ifnottex
For example:

@example
@group
bincoeff (5, 2)
   @xresult{} 10
@end group
@end example

In most cases, the @code{nchoosek} function is faster for small
scalar integer arguments.  It also warns about loss of precision for
big arguments.

@seealso{nchoosek}
@end deftypefn
