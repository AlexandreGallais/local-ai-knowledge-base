# dos

```octave
function [status, text] = dos (command, echo_arg)
```

@deftypefn  {} {} dos ("@var{command}")
@deftypefnx {} {@var{status} =} dos ("@var{command}")
@deftypefnx {} {[@var{status}, @var{text}] =} dos ("@var{command"})
@deftypefnx {} {[@dots{}] =} dos ("@var{command}", "-echo")
Execute a system command if running under a Windows-like operating system,
otherwise do nothing.

Octave waits for the external command to finish before returning the exit
status of the program in @var{status} and any output in @var{text}.

When called with no output argument, or the @qcode{"-echo"} argument is
given, then @var{text} is also sent to standard output.
@seealso{unix, system, isunix, ismac, ispc}
@end deftypefn
