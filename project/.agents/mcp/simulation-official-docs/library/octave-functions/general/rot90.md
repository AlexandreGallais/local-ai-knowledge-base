# rot90

```octave
function B = rot90 (A, k = 1)
```

@deftypefn  {} {@var{B} =} rot90 (@var{A})
@deftypefnx {} {@var{B} =} rot90 (@var{A}, @var{k})
Rotate array by 90 degree increments.

Return a copy of @var{A} with the elements rotated counterclockwise in
90-degree increments.

The second argument is optional, and specifies how many 90-degree rotations
are to be applied (the default value is 1).  Negative values of @var{k}
rotate the matrix in a clockwise direction.
For example,

@example
@group
rot90 ([1, 2; 3, 4], -1)
    @xresult{}  3  1
        4  2
@end group
@end example

@noindent
rotates the given matrix clockwise by 90 degrees.  The following are all
equivalent statements:

@example
@group
rot90 ([1, 2; 3, 4], -1)
rot90 ([1, 2; 3, 4], 3)
rot90 ([1, 2; 3, 4], 7)
@end group
@end example

The rotation is always performed on the plane of the first two dimensions,
i.e., rows and columns.  To perform a rotation on any other plane, use
@code{rotdim}.

@seealso{rotdim, fliplr, flipud, flip}
@end deftypefn
