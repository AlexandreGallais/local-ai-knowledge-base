# weboptions

```octave
function f = weboptions (varargin)
```

@deftypefn  {} {@var{options} =} weboptions ()
@deftypefnx {} {@var{options} =} weboptions (@var{name1}, @var{value1}, @dots{})

Specify parameters for RESTful web services.

When called with no inputs return a default @code{weboptions} object
to specify parameters for a request to a web service.  A @code{weboptions}
object is an optional input argument to the @code{webread} and
@code{webwrite} functions.

Multiple name and value pair arguments may be specified in any order as
@var{name1}, @var{value1}, @var{name2}, @var{value2}, etc.

The option names must match @strong{exactly} one of those specified in the
table below.

The following options are available:

@itemize @bullet
@item
@samp{CharacterEncoding} --- Specify the character encoding of the data:

@samp{auto} (default), @samp{UTF-8}, @samp{US-ASCII}.
@samp{auto} chooses an encoding based on the content-type of the data.

@item
@samp{UserAgent} --- Specify the User Agent for the connection.

Default value is @samp{Octave/VERSION}, where @samp{VERSION} is the
current version of Octave as returned by @code{version}.

@item
@samp{Timeout} --- Specify the timeout value for the connection in
seconds.

Default is 5 seconds.  The special value @samp{Inf} sets the timeout to
the maximum value of 2147.483647 seconds.

@item
@samp{Username} --- User identifier for a basic HTTP connection.

Default is @qcode{""}.  It must be a string or character vector.

@item
@samp{Password} --- User authentication password for HTTP connection.

Default is @qcode{""}.  It must be a string or character vector.

Programming Note: If you display a @code{weboption} object with the
Password property set, the value is displayed as a string containing
@qcode{'*'}.  However, the object stores the value of the Password
property as plain text.

@item
@samp{KeyName} --- Specify the name of an additional key to be added to
the HTTP request header.

It must be a string or character vector.  It should be coupled with
@samp{KeyValue}.

@item
@samp{KeyValue} --- Specify the value of the key @samp{KeyName}.

@samp{KeyName} must already be assigned in order to specify this field.

@item
@samp{ContentType} --- Specify the content type of the data.

The following values are available:
@samp{auto}, @samp{text}, @samp{json}

Default is @samp{auto}.  It automatically determines the content type.
All other formats like @samp{audio}, @samp{binary}, etc.@: available in
@sc{matlab} are not currently supported.

@item
@samp{ContentReader} --- Not yet implemented.  Only for @sc{matlab}
compatibility.

@item
@samp{MediaType} --- Not yet implemented.  Only for @sc{matlab}
compatibility.

@item
@samp{RequestMethod} --- Specifies the type of request to be made.

The following methods are available:
@samp{get}, @samp{put}, @samp{post}, @samp{delete}, @samp{patch}

@code{webread} uses the HTTP GET method.  @code{webwrite} uses the HTTP
POST method as default.

@item
@samp{ArrayFormat} -- Not yet implemented.  Only for @sc{matlab}
compatibility.

@item
@samp{@nospell{HeaderFields}} --- Specify header fields for the
connection.

Names and values of header fields, specified as an m-by-2 cell array of
strings, to add to the HTTP request header.
@code{@nospell{HeaderFields}@{i,1@}} is the name of a field and
@code{@nospell{HeaderFields}@{i,2@}} is its value.

@example
@group
weboptions ("HeaderFields",
            @{"Content-Length", "78" ;
             "Content-Type", "application/json"@})
@end group
@end example

@noindent
creates a weboptions object that contains two header fields:
@code{Content-Length} with value @code{78} and @code{Content-Type} with
value @code{application/json}.

@item
@samp{CertificateFilename} --- Not yet implemented.  Only for @sc{matlab}
compatibility.
@end itemize

@seealso{webread, webwrite}
@end deftypefn
