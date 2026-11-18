# dlmwrite

```octave
function dlmwrite (file, M, varargin)
```

@deftypefn  {} {} dlmwrite (@var{file}, @var{M})
@deftypefnx {} {} dlmwrite (@var{file}, @var{M}, @var{delim}, @var{r}, @var{c})
@deftypefnx {} {} dlmwrite (@var{file}, @var{M}, @var{key}, @var{val} @dots{})
@deftypefnx {} {} dlmwrite (@var{file}, @var{M}, "-append", @dots{})
@deftypefnx {} {} dlmwrite (@var{fid}, @dots{})
Write the numeric matrix @var{M} to the text file @var{file} using a
delimiter.

@var{file} should be a filename or a writable file ID given by @code{fopen}.

The parameter @var{delim} specifies the delimiter to use to separate values
on a row.  If no delimiter is specified the comma character @samp{,} is
used.

The value of @var{r} specifies the number of delimiter-only lines to add to
the start of the file.

The value of @var{c} specifies the number of delimiters to prepend to each
line of data.

If the argument @qcode{"-append"} is given, append to the end of @var{file}.

In addition, the following keyword value pairs may appear at the end of
the argument list:

@table @asis
@item @qcode{"append"}
Either @qcode{"on"} or @qcode{"off"}.  See @qcode{"-append"} above.

@item @qcode{"delimiter"}
See @var{delim} above.

@item @qcode{"newline"}
The character(s) to separate each row.  Three special cases exist for this
option.  @qcode{"unix"} is changed into @qcode{"@backslashchar{}n"},
@qcode{"pc"} is changed into @qcode{"@backslashchar{}r@backslashchar{}n"},
and @qcode{"mac"} is changed into @qcode{"@backslashchar{}r"}.  Any other
value is used directly as the newline separator.

@item @qcode{"roffset"}
See @var{r} above.

@item @qcode{"coffset"}
See @var{c} above.

@item @qcode{"precision"}
The precision to use when writing the file.  It can either be a format
string (as used by fprintf) or a number of significant digits.
@end table

@example
dlmwrite ("file.csv", reshape (1:16, 4, 4));
@end example

@example
dlmwrite ("file.tex", a, "delimiter", "&", "newline", "\n")
@end example

@seealso{dlmread, csvread, csvwrite}
@end deftypefn
