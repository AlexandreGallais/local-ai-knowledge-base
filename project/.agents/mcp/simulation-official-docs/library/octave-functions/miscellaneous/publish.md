# publish

```octave
function output_file = publish (file, varargin)
```

@deftypefn  {} {} publish (@var{file})
@deftypefnx {} {} publish (@var{file}, @var{output_format})
@deftypefnx {} {} publish (@var{file}, @var{option1}, @var{value1}, @dots{})
@deftypefnx {} {} publish (@var{file}, @var{options})
@deftypefnx {} {@var{output_file} =} publish (@var{file}, @dots{})

Generate a report from the Octave script file @var{file} in one of several
output formats.

The generated reports interpret Publishing Markup in section comments, which
is explained in detail in the GNU Octave manual.  Section comments are
comment blocks that start with a line with double comment character.

Assume the following example, using some Publishing Markup, to be the
contents of the script file @file{pub_example.m}:

@example
@group
## Headline title
#
# Some *bold*, _italic_, or |monospaced| Text with
# a <https://www.octave.org link to *GNU Octave*>.
##

# "Real" Octave commands to be evaluated
sombrero ()

%% @sc{matlab} comment style ('%') is supported as well
%
% * Bulleted list item 1
% * Bulleted list item 2
%
% # Numbered list item 1
% # Numbered list item 2
@end group
@end example

To publish this script file, type @code{publish ("pub_example.m")}.

When called with one input argument, a HTML report is generated in a
subdirectory @file{html} relative to the current working directory.  Any
Octave commands in @file{pub_example.m} are evaluated in a separate context
and any figures created while executing the script file are included in the
report.

Using @code{publish (@var{file}, @var{output_format})} is equivalent to the
function call using a structure

@example
@group
@var{options}.format = @var{output_format};
publish (@var{file}, @var{options})
@end group
@end example

@noindent
which is described below.  The same holds for using option/value pairs

@example
@group
@var{options}.@var{option1} = @var{value1};
publish (@var{file}, @var{options})
@end group
@end example

The structure @var{options} can have the following field names.  If a field
name is not specified, the default value is used:

@itemize @bullet
@item
@samp{format} --- Output format of the published script file, one of

@samp{html} (default), @samp{doc}, @samp{latex}, @samp{ppt},
@samp{pdf}, or @samp{xml}.

The output formats @samp{doc}, @samp{ppt}, and @samp{xml} are not currently
supported.  To generate a @samp{doc} report, open a generated @samp{html}
report with your office suite.

In Octave custom formats are supported by implementing all callback
subfunctions in a function file named
@samp{__publish_<custom format>_output__.m}.  To obtain a template for the
HTML format type:

@example
@group
edit (fullfile (fileparts (which ("publish")), ...
      "private", "__publish_html_output__.m"))
@end group
@end example

@item
@samp{outputDir} --- Full path of the directory where the generated report
will be located.  If no directory is given, the report is generated in a
subdirectory @file{html} relative to the current working directory.

@item
@samp{stylesheet} --- Not supported, only for @sc{matlab} compatibility.

@item
@samp{createThumbnail} --- Not supported, only for @sc{matlab}
compatibility.

@item
@samp{figureSnapMethod} --- Not supported, only for @sc{matlab}
compatibility.

@item
@samp{imageFormat} --- Desired format for any images produced while
evaluating the code.  The allowed image formats depend on the output format:

@itemize @bullet
@item @samp{html}, @samp{xml} --- @samp{png} (default), any image format
supported by Octave

@item @samp{latex} --- @samp{epsc2} (default), any image format supported by
Octave

@item @samp{pdf} --- @samp{jpg} (default) or @samp{bmp}, note @sc{matlab}
uses @samp{bmp} as default

@item @samp{doc} or @samp{ppt} --- @samp{png} (default), @samp{jpg},
@samp{bmp}, or @samp{tiff}
@end itemize

@item
@samp{maxWidth} and @samp{maxHeight} --- Maximum width (height) of the
produced images in pixels.  An empty value means no restriction.  Both
values must be set in order for the option to work properly.

@samp{[]} (default), integer value @geq{} 0

@item
@samp{useNewFigure} --- Use a new figure window for figures created by the
evaluated code.  This avoids side effects with already opened figure
windows.

@samp{true} (default) or @samp{false}

@item
@samp{evalCode} --- Evaluate code of the Octave source file

@samp{true} (default) or @samp{false}

@item
@samp{catchError} --- Catch errors while evaluating code and continue

@samp{true} (default) or @samp{false}

@item
@samp{codeToEvaluate} --- Octave commands that should be evaluated prior to
publishing the script file.  These Octave commands do not appear in the
generated report.

@item
@samp{maxOutputLines} --- Maximum number of output lines from code
evaluation which are included in output.

@samp{Inf} (default) or integer value > 0

@item
@samp{showCode} --- Show the evaluated Octave commands in the generated
report

@samp{true} (default) or @samp{false}
@end itemize

The option output @var{output_file} is a string with path and file name
of the generated report.

@seealso{grabcode}
@end deftypefn
