# computer

```octave
function [comp, maxsize, endian] = computer (arch)
```

@deftypefn  {} {} computer ()
@deftypefnx {} {@var{comp} =} computer ()
@deftypefnx {} {[@var{comp}, @var{maxsize}] =} computer ()
@deftypefnx {} {[@var{comp}, @var{maxsize}, @var{endian}] =} computer ()
@deftypefnx {} {@var{arch} =} computer ("arch")
Print or return a string of the form @var{cpu}-@var{vendor}-@var{os} that
identifies the type of computer that Octave is running on.

If invoked with an output argument, the value is returned instead of
printed.  For example:

@example
@group
computer ()
   @print{} x86_64-pc-linux-gnu

mycomp = computer ()
   @xresult{} mycomp = x86_64-pc-linux-gnu
@end group
@end example

If two output arguments are requested, also return the maximum number of
elements for an array.  This will depend on whether Octave has been
compiled with 32-bit or 64-bit index vectors.

If three output arguments are requested, also return the byte order of the
current system as a character (@qcode{"B"} for big-endian or @qcode{"L"}
for little-endian).

If the argument @qcode{"arch"} is specified, return a string indicating the
architecture of the computer on which Octave is running.

Results may be different if Octave was invoked with the --traditional
option.
@seealso{isunix, ismac, ispc}
@end deftypefn
