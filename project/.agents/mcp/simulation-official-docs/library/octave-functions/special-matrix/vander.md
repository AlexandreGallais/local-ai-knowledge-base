# vander

```octave
function V = vander (c, n)
```

@deftypefn  {} {@var{V} =} vander (@var{c})
@deftypefnx {} {@var{V} =} vander (@var{c}, @var{n})
Return the @nospell{Vandermonde} matrix whose next to last column is
@var{c}.

If @var{n} is specified, it determines the number of columns; otherwise,
@var{n} is taken to be equal to the length of @var{c}.

A @nospell{Vandermonde} matrix has the form:
@tex
$$
\left[\matrix{c_1^{n-1}  & \cdots & c_1^2  & c_1    & 1      \cr
              c_2^{n-1}  & \cdots & c_2^2  & c_2    & 1      \cr
              \vdots     & \ddots & \vdots & \vdots & \vdots \cr
              c_n^{n-1}  & \cdots & c_n^2  & c_n    & 1      }\right]
$$
@end tex
@ifnottex

@example
@group
c(1)^(n-1) @dots{} c(1)^2  c(1)  1
c(2)^(n-1) @dots{} c(2)^2  c(2)  1
    .     .      .      .    .
    .       .    .      .    .
    .         .  .      .    .
c(n)^(n-1) @dots{} c(n)^2  c(n)  1
@end group
@end example

@end ifnottex
@seealso{polyfit}
@end deftypefn
