# isfigure

```octave
function tf = isfigure (h)
```

@deftypefn {} {@var{tf} =} isfigure (@var{h})
Return true if @var{h} is a figure graphics handle and false otherwise.

If @var{h} is a matrix then return a logical array which is true where the
elements of @var{h} are figure graphics handles and false where they are
not.
@seealso{isaxes, ishghandle, isgraphics}
@end deftypefn
