# planerot

```octave
function [G, y] = planerot (x)
```

@deftypefn {} {[@var{G}, @var{y}] =} planerot (@var{x})
Compute the Givens rotation matrix for the two-element column vector
@var{x}.
@tex
The Givens matrix is a $2\times 2$ orthogonal matrix
$$
 G = \left[\matrix{c & s\cr -s'& c\cr}\right]
$$
such that
$$
 G \left[\matrix{x(1)\cr x(2)}\right] = \left[\matrix{\ast\cr 0}\right]
$$
@end tex
@ifnottex
The Givens matrix is a 2-by-2 orthogonal matrix

@example
@group
@var{G} = [ @var{c} , @var{s}
     -@var{s}', @var{c}]
@end group
@end example

@noindent
such that

@example
@var{y} = @var{G} * [@var{x}(1); @var{x}(2)] @equiv{} [*; 0]
@end example

@end ifnottex

Note: The Givens matrix represents a counterclockwise rotation of a 2-D
plane and can be used to introduce zeros into a matrix prior to complete
factorization.
@seealso{givens, qr}
@end deftypefn
