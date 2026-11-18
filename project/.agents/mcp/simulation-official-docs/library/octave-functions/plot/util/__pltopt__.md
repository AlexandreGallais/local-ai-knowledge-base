# __pltopt__

```octave
function [options, valid] = __pltopt__ (caller, opt, err_on_invalid = true)
```

@deftypefn {} {[@var{options}, @var{valid}] =} __pltopt__ (@var{caller}, @var{opt}, @var{err_on_invalid})

Decode plot option strings.

@var{opt} can currently be some combination of the following:

@table @asis
@item @qcode{"-"}
For solid linestyle (default).

@item @qcode{"--"}
For dashed line style.

@item @qcode{"-."}
For linespoints plot style.

@item @qcode{":"}
For dots plot style.

@item  @qcode{"r"}
@itemx @qcode{"red"}
Red line color.

@item  @qcode{"g"}
@itemx @qcode{"green"}
Green line color.

@item  @qcode{"b"}
@itemx @qcode{"blue"}
Blue line color.

@item  @qcode{"c"}
@itemx @qcode{"cyan"}
Cyan line color.

@item  @qcode{"m"}
@itemx @qcode{"magenta"}
Magenta line color.

@item  @qcode{"y"}
@itemx @qcode{"yellow"}
Yellow line color.

@item  @qcode{"k"}
@itemx @qcode{"black"}
Black line color.

@item  @qcode{"w"}
@itemx @qcode{"white"}
White line color.

@item @qcode{";displayname;"}
The text between semicolons is used to set the @qcode{"displayname"}
property which determines the label used for the plot legend.

@item  @qcode{"+"}
@itemx @qcode{"o"}
@itemx @qcode{"*"}
@itemx @qcode{"."}
@itemx @qcode{"x"}
@itemx @qcode{"|"}
@itemx @qcode{"_"}
@itemx @qcode{"s"}
@itemx @qcode{"d"}
@itemx @qcode{"^"}
@itemx @qcode{"v"}
@itemx @qcode{">"}
@itemx @qcode{"<"}
@itemx @qcode{"p"}
@itemx @qcode{"h"}
Used in combination with the points or linespoints styles, set the point
style.
@end table

@end deftypefn
