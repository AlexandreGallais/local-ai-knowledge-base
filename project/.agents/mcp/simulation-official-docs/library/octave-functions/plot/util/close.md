# close

```octave
function status = close (arg1, arg2)
```

@deftypefn  {} {} close
@deftypefnx {} {} close (@var{h})
@deftypefnx {} {} close @var{figname}
@deftypefnx {} {} close all
@deftypefnx {} {} close all hidden
@deftypefnx {} {} close all force
@deftypefnx {} {@var{status} =} close (@dots{})
Close figure window(s).

When called with no arguments, close the current figure.  This is equivalent
to @code{close (gcf)}.  If the input @var{h} is a graphic handle, or vector
of graphics handles, then close each figure in @var{h}.  The figure to
close may also be specified by name @var{figname} which is matched against
the @qcode{"Name"} property of all figures.

If the argument @qcode{"all"} is given then all figures with visible handles
(HandleVisibility = @qcode{"on"}) are closed.

If the additional argument @qcode{"hidden"} is given then all figures,
including hidden ones, are closed.

If the additional argument @qcode{"force"} is given then figures are closed
even when @qcode{"closerequestfcn"} has been altered to prevent closing the
window.

If the optional output @var{status} is requested then Octave returns 1 if
the figure windows were closed successfully.

Implementation Note: @code{close} operates by making the handle @var{h} the
current figure, and then calling the function specified by the
@qcode{"closerequestfcn"} property of the figure.  By default, the function
@code{closereq} is used.  It is possible that the function invoked will
delay or abort removing the figure.  To remove a figure without executing
any callback functions use @code{delete}.  When writing a callback function
to close a window do not use @code{close} to avoid recursion.

@seealso{closereq, delete}
@end deftypefn
