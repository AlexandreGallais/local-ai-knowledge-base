# compan

```octave
function A = compan (c)
```

@deftypefn {} {@var{A} =} compan (@var{c})
Compute the companion matrix corresponding to polynomial coefficient vector
@var{c}.

The companion matrix is
@tex
$$
A = \left[\matrix{
 -c_2/c_1 & -c_3/c_1 & \cdots & -c_N/c_1 & -c_{N+1}/c_1\cr
     1    &     0    & \cdots &     0    &         0   \cr
     0    &     1    & \cdots &     0    &         0   \cr
  \vdots  &   \vdots & \ddots &  \vdots  &      \vdots \cr
     0    &     0    & \cdots &     1    &         0}\right].
$$
@end tex
@ifnottex
@c Set example in small font to prevent overfull line

@smallexample
@group
     _                                                        _
    |  -c(2)/c(1)   -c(3)/c(1)  @dots{}  -c(N)/c(1)  -c(N+1)/c(1)  |
    |       1            0      @dots{}       0             0      |
    |       0            1      @dots{}       0             0      |
A = |       .            .      .         .             .      |
    |       .            .       .        .             .      |
    |       .            .        .       .             .      |
    |_      0            0      @dots{}       1             0     _|
@end group
@end smallexample

@end ifnottex
The eigenvalues of the companion matrix are equal to the roots of the
polynomial.
@seealso{roots, poly, eig}
@end deftypefn
