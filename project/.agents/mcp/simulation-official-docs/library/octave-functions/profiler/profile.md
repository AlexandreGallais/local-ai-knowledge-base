# profile

```octave
function retval = profile (arg)
```

@deftypefn  {} {} profile on
@deftypefnx {} {} profile off
@deftypefnx {} {} profile resume
@deftypefnx {} {} profile clear
@deftypefnx {} {@var{S} =} profile ("status")
@deftypefnx {} {@var{T} =} profile ("info")
Control the built-in profiler.

@table @code
@item profile on
Start the profiler.  Any previously collected data is cleared.

@item profile off
Stop profiling.  The collected data can later be retrieved and examined
with @code{T = profile ("info")}.

@item profile clear
Clear all collected profiler data and stop profiling.

@item profile resume
Restart profiling without clearing the old data.  All newly collected
statistics are added to the existing ones.

@item @var{S} = profile ("status")
Return a structure with information about the current status of the
profiler.  At the moment, the only field is @code{ProfilerStatus} which is
either @qcode{"on"} or @qcode{"off"}.

@item @var{T} = profile ("info")
Return the collected profiling statistics in the structure @var{T}.  The
flat profile is returned in the field @code{FunctionTable} which is an
array of structures, each entry corresponding to a function which was called
and for which profiling statistics are present.  In addition, the field
@code{Hierarchical} contains the hierarchical call tree.  Each node has an
index into the @code{FunctionTable} identifying the function it corresponds
to as well as data fields for number of calls and time spent at this level
in the call tree.
@end table

@seealso{profshow, profexplore}
@end deftypefn
