# ishandle

```octave
function tf = ishandle (h)
```

@deftypefn {} {@var{tf} =} ishandle (@var{h})
Return true if @var{h} is a handle to a graphics or Java object and false
otherwise.

@var{h} may also be a matrix of handles in which case a logical array is
returned that is true where the elements of @var{h} are handles to graphics
or Java objects and false where they are not.

Programming Note: It is often more useful to test for a specific object
type.  To determine if a handle belongs to a graphics object use
@code{ishghandle} or @code{isgraphics}.  To determine if a handle belongs
to a Java object use @code{isjava}.
@seealso{ishghandle, isgraphics, isjava}
@end deftypefn
