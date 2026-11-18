# toeplitz

```octave
function T = toeplitz (c, r)
```

@deftypefn  {} {@var{T} =} toeplitz (@var{c})
@deftypefnx {} {@var{T} =} toeplitz (@var{c}, @var{r})
Return the Toeplitz matrix constructed from the first column @var{c},
and optionally the first row @var{r}.

If the second argument is omitted, the first row is taken to be the
same as the first column.  If the first element of @var{r} is not the same
as the first element of @var{c}, the first element of @var{c} is used.

A Toeplitz, or diagonal-constant, matrix has the same value along each
diagonal.  Although it need not be square, it often is.  An @nospell{MxN}
Toeplitz matrix has the form:
@tex
$$
\left[\matrix{c_1    & r_2     & r_3      & \cdots & r_n\cr
              c_2    & c_1     & r_2      & \cdots & r_{n-1}\cr
              c_3    & c_2     & c_1      & \cdots & r_{n-2}\cr
              \vdots & \vdots  & \vdots   & \ddots & \vdots\cr
              c_m    & c_{m-1} & c_{m-2} & \ldots & c{m-n+1}}\right]
$$
@end tex
@ifnottex

@example
@group
c(1)  r(2)   r(3)  @dots{}  r(n)
c(2)  c(1)   r(2)  @dots{} r(n-1)
c(3)  c(2)   c(1)  @dots{} r(n-2)
 .     .      .   .      .
 .     .      .     .    .
 .     .      .       .  .
c(m) c(m-1) c(m-2) @dots{} c(m-n+1)
@end group
@end example

@end ifnottex
@seealso{hankel}
@end deftypefn
