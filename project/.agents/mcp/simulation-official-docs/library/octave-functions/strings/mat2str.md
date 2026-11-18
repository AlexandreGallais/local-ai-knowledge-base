# mat2str

```octave
function s = mat2str (x, n = 15, cls = "")
```

@deftypefn  {} {@var{s} =} mat2str (@var{x})
@deftypefnx {} {@var{s} =} mat2str (@var{x}, @var{n})
@deftypefnx {} {@var{s} =} mat2str (@var{x}, [@var{n1}, @var{n2}])
@deftypefnx {} {@var{s} =} mat2str (@dots{}, "class")
Format real, complex, and logical matrices as strings.

The returned string may be used to reconstruct the original matrix by using
the @code{eval} function.

The precision of the values is given by @var{n}.  If @var{n} is a scalar
then both real and imaginary parts of the matrix are printed to the same
precision.  Otherwise @code{@var{n}(1)} defines the precision of the real
part and @code{@var{n}(2)} defines the precision of the imaginary part.
The default for @var{n} is 15.

If the argument @qcode{"class"} is given then the class of @var{x} is
included in the string in such a way that @code{eval} will result in the
construction of a matrix of the same class.

@example
@group
mat2str (pi)
     @xresult{} "3.14159265358979"

mat2str (pi, 5)
     @xresult{} "3.1416"

mat2str ([ -1/3 + i/7; 1/3 - i/7 ], [4 2])
     @xresult{} "[-0.3333+0.14i;0.3333-0.14i]"

mat2str ([ -1/3 +i/7; 1/3 -i/7 ], [4 2])
     @xresult{} "[-0.3333+0i 0+0.14i;0.3333+0i -0-0.14i]"

mat2str (int16 ([1 -1]), "class")
     @xresult{} "int16([1 -1])"

mat2str (logical (eye (2)))
     @xresult{} "[true false;false true]"

isequal (x, eval (mat2str (x)))
     @xresult{} 1
@end group
@end example

@seealso{sprintf, num2str, int2str}
@end deftypefn
