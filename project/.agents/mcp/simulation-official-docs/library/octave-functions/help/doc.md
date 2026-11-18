# doc

```octave
function retval = doc (function_name)
```

@deftypefn  {} {} doc @var{function_name}
@deftypefnx {} {} doc
Display documentation for the function @var{function_name} directly from an
online version of the printed manual, using the GNU Info browser.

If invoked without an argument, the manual is shown from the beginning.

For example, the command @kbd{doc rand} starts the GNU Info browser at the
@code{rand} node in the online version of the manual.

Once the GNU Info browser is running, help for using it is available using
the command @kbd{C-h}.
@seealso{help}
@end deftypefn
