# rotdim

```octave
function B = rotdim (A, n, plane)
```

@deftypefn  {} {@var{B} =} rotdim (@var{A})
@deftypefnx {} {@var{B} =} rotdim (@var{A}, @var{n})
@deftypefnx {} {@var{B} =} rotdim (@var{A}, @var{n}, @var{plane})
Return a copy of @var{A} with the elements rotated counterclockwise in
90-degree increments.

The second argument @var{n} is optional, and specifies how many 90-degree
rotations are to be applied (the default value is 1).  Negative values of
@var{n} rotate the matrix in a clockwise direction.

The third argument is also optional and defines the plane of the rotation.
If present, @var{plane} is a two element vector containing two different
valid dimensions of the matrix.  When @var{plane} is not given the first two
non-singleton dimensions are used.

For example,

@example
@group
rotdim ([1, 2; 3, 4], -1, [1, 2])
     @xresult{}  3  1
         4  2
@end group
@end example

@noindent
rotates the given matrix clockwise by 90 degrees.  The following are all
equivalent statements:

@example
@group
rotdim ([1, 2; 3, 4], -1, [1, 2])
rotdim ([1, 2; 3, 4], 3, [1, 2])
rotdim ([1, 2; 3, 4], 7, [1, 2])
@end group
@end example
@seealso{rot90, fliplr, flipud, flip}
@end deftypefn
