# guidata

```octave
function dataout = guidata (h, data)
```

@deftypefn  {} {@var{data} =} guidata (@var{h})
@deftypefnx {} {} guidata (@var{h}, @var{data})
Query or set user-custom GUI data.

The GUI data is stored in the figure handle @var{h}.  If @var{h} is not a
figure handle then it's parent figure will be used for storage.

@var{data} must be a single object which means it is usually preferable
for it to be a data container such as a cell array or struct so that
additional data items can be added easily.

@seealso{getappdata, setappdata, get, set, getpref, setpref}
@end deftypefn
