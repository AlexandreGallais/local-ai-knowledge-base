# mexext

```octave
function ext = mexext ()
```

@deftypefn {} {@var{ext} =} mexext ()
Return the filename extension used for MEX files.

Programming Note: Octave uses the extension @file{mex} for all MEX files
regardless of the operating system (Linux, Windows, Apple) or the bit-width
(32-bit or 64-bit) of the hardware.
@seealso{mex}
@end deftypefn
