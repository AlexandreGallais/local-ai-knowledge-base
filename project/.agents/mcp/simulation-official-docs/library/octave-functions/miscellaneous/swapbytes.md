# swapbytes

```octave
function y = swapbytes (x)
```

@deftypefn {} {@var{y} =} swapbytes (@var{x})
Swap the byte order on values, converting from little endian to big endian
and vice versa.

For example:

@example
@group
swapbytes (uint16 (1:4))
@xresult{}   256   512   768  1024
@end group
@end example

@seealso{typecast, cast}
@end deftypefn
