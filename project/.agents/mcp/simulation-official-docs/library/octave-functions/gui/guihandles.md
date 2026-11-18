# guihandles

```octave
function hdata = guihandles (h)
```

@deftypefn  {} {@var{hdata} =} guihandles (@var{h})
@deftypefnx {} {@var{hdata} =} guihandles
Return a structure of object handles for the figure associated with
handle @var{h}.

If no handle is specified the current figure returned by @code{gcf} is used.

The fieldname for each entry of @var{hdata} is taken from the @qcode{"tag"}
property of the graphic object.  If the tag is empty then the handle is not
returned.  If there are multiple graphic objects with the same tag then
the entry in @var{hdata} will be a vector of handles.  @code{guihandles}
includes all possible handles, including those for
which @qcode{"HandleVisibility"} is @qcode{"off"}.
@seealso{guidata, findobj, findall, allchild}
@end deftypefn
