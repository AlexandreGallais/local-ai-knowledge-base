# pathdef

```octave
function val = pathdef ()
```

@deftypefn {} {@var{val} =} pathdef ()
Return the default path for Octave.

The path information is extracted from one of four sources.
The possible sources, in order of preference, are:

@enumerate
@item @file{.octaverc}

@item @file{~/.octaverc}

@item @file{<OCTAVE_HOME>/@dots{}/<version>/m/startup/octaverc}

@item Octave's path prior to changes by any octaverc file.
@end enumerate
@seealso{path, addpath, rmpath, genpath, savepath}
@end deftypefn
