# rectint

```octave
function dists = rectint (a, b)
```

@deftypefn {} {@var{area} =} rectint (@var{a}, @var{b})
Compute area or volume of intersection of rectangles or N-D boxes.

Compute the area of intersection of rectangles in @var{a} and rectangles in
@var{b}.  N-dimensional boxes are supported in which case the volume, or
hypervolume is computed according to the number of dimensions.

2-dimensional rectangles are defined as @code{[xpos ypos width height]}
where xpos and ypos are the position of the bottom left corner.  Higher
dimensions are supported where the coordinates for the minimum value of each
dimension follow the length of the box in that dimension, e.g.,
@code{[xpos ypos zpos kpos @dots{} width height depth k_length @dots{}]}.

Each row of @var{a} and @var{b} define a rectangle, and if both define
multiple rectangles, then the output, @var{area}, is a matrix where the i-th
row corresponds to the i-th row of a and the j-th column corresponds to the
j-th row of b.

@seealso{polyarea}
@end deftypefn
