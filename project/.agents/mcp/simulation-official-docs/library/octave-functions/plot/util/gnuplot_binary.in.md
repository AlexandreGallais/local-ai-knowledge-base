# gnuplot_binary.in

```octave
function [prog, args] = gnuplot_binary (new_prog, varargin)
```

@deftypefn  {} {[@var{prog}, @var{args}] =} gnuplot_binary ()
@deftypefnx {} {[@var{old_prog}, @var{old_args}] =} gnuplot_binary (@var{new_prog})
@deftypefnx {} {[@var{old_prog}, @var{old_args}] =} gnuplot_binary (@var{new_prog}, @var{arg1}, @dots{})
Query or set the name of the program invoked by the plot command when the
graphics toolkit is set to @qcode{"gnuplot"}.

Additional arguments to pass to the external plotting program may also be
given.  The default value is @qcode{"gnuplot"} with no additional arguments.
@xref{Installing Octave}.
@seealso{graphics_toolkit}
@end deftypefn
