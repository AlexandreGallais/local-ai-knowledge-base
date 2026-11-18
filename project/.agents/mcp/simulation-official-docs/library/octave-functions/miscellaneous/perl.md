# perl

```octave
function [output, status] = perl (scriptfile, varargin)
```

@deftypefn  {} {@var{output} =} perl (@var{scriptfile})
@deftypefnx {} {@var{output} =} perl (@var{scriptfile}, @var{argument1}, @var{argument2}, @dots{})
@deftypefnx {} {[@var{output}, @var{status}] =} perl (@dots{})
Invoke Perl script @var{scriptfile}, possibly with a list of command line
arguments.

Return output in @var{output} and optional status in @var{status}.  If
@var{scriptfile} is not an absolute filename it is searched for in the
current directory and then in the Octave loadpath.
@seealso{system, python}
@end deftypefn
