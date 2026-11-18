# int2str

```octave
function str = int2str (n)
```

@deftypefn {} {@var{str} =} int2str (@var{n})
Convert an integer (or array of integers) to a string (or a character
array).

@example
@group
int2str (123)
  @xresult{} 123

s = int2str ([1, 2, 3; 4, 5, 6])
  @xresult{} s =
        1  2  3
        4  5  6

whos s
  @xresult{} Variables in the current scope:
        Attr Name        Size                     Bytes  Class
        ==== ====        ====                     =====  =====
             s           2x7                         14  char
     Total is 14 elements using 14 bytes
@end group
@end example

This function is not very flexible.  For better control over the
results, use @code{sprintf} (@pxref{Formatted Output}).

Programming Notes:

Non-integers are rounded to integers before display.  Only the real part
of complex numbers is displayed.

@seealso{sprintf, num2str, mat2str}
@end deftypefn
