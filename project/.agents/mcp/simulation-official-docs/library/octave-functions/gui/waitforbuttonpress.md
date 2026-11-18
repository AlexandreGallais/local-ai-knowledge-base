# waitforbuttonpress

```octave
function b = waitforbuttonpress ()
```

@deftypefn {} {@var{b} =} waitforbuttonpress ()
Wait for mouse click or key press over the current figure window.

The return value of @var{b} is 0 if a mouse button was pressed or 1 if a
key was pressed.
@seealso{waitfor, ginput, kbhit}
@end deftypefn
