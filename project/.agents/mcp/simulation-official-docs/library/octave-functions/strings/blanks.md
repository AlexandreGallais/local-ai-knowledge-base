# blanks

```octave
function str = blanks (n)
```

@deftypefn {} {@var{str} =} blanks (@var{n})
Return a string of @var{n} blanks.

For example:

@example
@group
blanks (10);
whos ans
     @xresult{}
      Attr Name        Size                     Bytes  Class
      ==== ====        ====                     =====  =====
           ans         1x10                        10  char
@end group
@end example
@seealso{repmat}
@end deftypefn
