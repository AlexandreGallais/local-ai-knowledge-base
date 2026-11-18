# allchild

```octave
function h = allchild (handles)
```

@deftypefn {} {@var{h} =} allchild (@var{handles})
Find all children, including hidden children, of a graphics object.

This function is similar to @code{get (h, "children")}, but also returns
hidden objects (HandleVisibility = @qcode{"off"}).

If @var{handles} is a scalar, @var{h} will be a vector.  Otherwise,
@var{h} will be a cell matrix of the same size as @var{handles} and each
cell will contain a vector of handles.
@seealso{findall, findobj, get, set}
@end deftypefn
