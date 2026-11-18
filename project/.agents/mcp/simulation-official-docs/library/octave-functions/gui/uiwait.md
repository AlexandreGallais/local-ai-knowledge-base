# uiwait

```octave
function uiwait (varargin)
```

@deftypefn  {} {} uiwait
@deftypefnx {} {} uiwait (@var{h})
@deftypefnx {} {} uiwait (@var{h}, @var{timeout})
Suspend program execution until the figure with handle @var{h} is deleted
or @code{uiresume} is called.

When no figure handle is specified this function uses the current figure.
If the figure handle is invalid or there is no current figure, this
functions returns immediately.

When specified, @var{timeout} defines the number of seconds to wait
for the figure deletion or the @code{uiresume} call.  The timeout value
must be at least 1.  If a smaller value is specified, a warning is issued
and a timeout value of 1 is used instead.  If a non-integer value is
specified, it is truncated towards 0.  If @var{timeout} is not specified,
the program execution is suspended indefinitely.
@seealso{uiresume, waitfor}
@end deftypefn
