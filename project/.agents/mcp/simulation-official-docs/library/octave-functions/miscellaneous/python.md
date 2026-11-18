# python

```octave
function [output, status] = python (scriptfile, varargin)
```

@deftypefn  {} {@var{output} =} python (@var{scriptfile})
@deftypefnx {} {@var{output} =} python (@var{scriptfile}, @var{argument1}, @var{argument2}, @dots{})
@deftypefnx {} {[@var{output}, @var{status}] =} python (@dots{})
Invoke Python script @var{scriptfile}, possibly with a list of command line
arguments.

Return output in @var{output} and optional status in @var{status}.  If
@var{scriptfile} is not an absolute filename it is searched for in the
current directory and then in the Octave loadpath.

Programming Note: On UNIX systems, the script will be executed by
@command{python3} and on Windows by @command{python}.  You can override
these defaults by setting the @env{PYTHON} environment variable, for example
from within Octave using @code{setenv PYTHON /usr/local/bin/python3}.

@seealso{system, perl}
@end deftypefn
