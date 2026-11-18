# unix

```octave
function [status, text] = unix (command, echo_arg)
```

@deftypefn  {} {} unix ("@var{command}")
@deftypefnx {} {@var{status} =} unix ("@var{command}")
@deftypefnx {} {[@var{status}, @var{text}] =} unix ("@var{command}")
@deftypefnx {} {[@dots{}] =} unix ("@var{command}", "-echo")
Execute a system command if running under a Unix-like operating system,
otherwise do nothing.

Octave waits for the external command to finish before returning the exit
status of the program in @var{status} and any output in @var{text}.

When called with no output argument, or the @qcode{"-echo"} argument is
given, then @var{text} is also sent to standard output.
@seealso{dos, system, isunix, ismac, ispc}
@end deftypefn
