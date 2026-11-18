# isaxes

```octave
function tf = isaxes (h)
```

@deftypefn {} {@var{tf} =} isaxes (@var{h})
Return true if @var{h} is an axes graphics handle and false otherwise.

If @var{h} is a matrix then return a logical array which is true where the
elements of @var{h} are axes graphics handles and false where they are not.
@seealso{isfigure, ishghandle, isgraphics}
@end deftypefn
