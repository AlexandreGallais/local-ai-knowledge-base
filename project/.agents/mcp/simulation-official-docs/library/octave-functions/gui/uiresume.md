# uiresume

```octave
function uiresume (h)
```

@deftypefn {} {} uiresume (@var{h})
Resume program execution suspended with @code{uiwait}.

The handle @var{h} must be the same as the on specified in @code{uiwait}.
If the handle is invalid or there is no @code{uiwait} call pending for the
figure with handle @var{h}, this function does nothing.
@seealso{uiwait}
@end deftypefn
