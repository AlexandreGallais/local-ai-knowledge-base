---
title: "check-tag-names (part 1 of 3)"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-tag-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-tag-names`

* Fixer
* Options
    * `definedTags`
    * `enableFixer`
    * `inlineTags`
    * `jsxTags`
    * `typed`
* Context and settings
* Failing examples
* Passing examples

Reports invalid block tag names.

Valid JSDoc 3 Block Tags are:

```
abstract
access
alias
async
augments
author
borrows
callback
class
classdesc
constant
constructs
copyright
default
deprecated
description
enum
event
example
exports
external
file
fires
function
generator
global
hideconstructor
ignore
implements
inheritdoc
inner
instance
interface
kind
lends
license
listens
member
memberof
memberof!
mixes
mixin
module
name
namespace
override
package
param
private
property
protected
public
readonly
requires
returns
see
since
static
summary
this
throws
todo
tutorial
type
typedef
variation
version
yields
```

`modifies` is also supported (see source)
but is undocumented.

The following synonyms are also recognized if you set them in
`tagNamePreference` as a key (or replacement):

```
arg
argument
const
constructor
defaultvalue
desc
emits
exception
extends
fileoverview
func
host
method
overview
prop
return
var
virtual
yield
```

If you wish to allow in certain cases both a primary tag name and its
alias(es), you can set a normally non-preferred tag name to itself to indicate
that you want to allow both the default tag (in this case `@returns`) and a
non-default (in this case `return`):

```js
"tagNamePreference": {
    "return": "return",
}
```

Because the tags indicated as replacements in
`settings.jsdoc.tagNamePreference` will automatically be considered as valid,
the above works.

Likewise are the tag keys of `settings.jsdoc.structuredTags` automatically
considered as valid (as their defining an expected structure for tags implies
the tags may be used).

For TypeScript
(or Closure), when `settings.jsdoc.mode` is set to `typescript` or `closure`,
one may also use the following:

```
template
```

And for Closure,
when `settings.jsdoc.mode` is set to `closure`, one may use the following (in
addition to the JSDoc and TypeScript tags–though replacing `returns` with
`return`):

```
define (synonym of `const` per jsdoc source)
dict
export
externs
final
implicitCast (casing distinct from that recognized by jsdoc internally)
inheritDoc (casing distinct from that recognized by jsdoc internally)
noalias
nocollapse
nocompile
noinline
nosideeffects
polymer
polymerBehavior
preserve
record (synonym of `interface` per jsdoc source)
struct
suppress
unrestricted
```

...and these undocumented tags which are only in source:

```
closurePrimitive
customElement
expose
hidden
idGenerator
meaning
mixinClass
mixinFunction
ngInject
owner
typeSummary
wizaction
```

If you instead wish to reject a normally valid tag, e.g., `@todo`, one may set the
tag to `false`:

```json
{
    "rules": {},
    "settings": {
        "jsdoc": {
            "tagNamePreference": {
                "todo": false
            }
        }
    }
}
```

Also checks for unknown inline tags, with the following being permitted by default
(see the `inlineTags` option):

```
// JSDoc
link
linkcode
linkplain
tutorial

// TSDoc
inheritDoc
label

// typedoc
include
includeCode
```

## Fixer

Auto-removes types that are redundant with the `typed` option.

For `@property` and `@prop` tags flagged by that option, the fixer can instead
move each description onto the matching property. This happens when every
such tag has the form `@prop NAME - description`, `NAME` is a property of the
object type literal or object expression on the attached declaration (including
an `export` of that declaration), and that property does not already have a
JSDoc comment. Each description is inserted as a new JSDoc block directly
above the property, the tags are removed from the parent block, and the parent
block is removed if nothing remains. If a name does not match, the tag has no
description, or the attached value is not a recognized object, the fixer
removes the tag name and leaves the remaining text in the parent comment.

## Options

A single options object has the following properties.

### `definedTags`

Use an array of `definedTags` strings to configure additional, allowed tags.
The format is as follows:

```json
{
  "definedTags": ["note", "record"]
}
```

### `enableFixer`

Set to `false` to disable auto-removal of types that are redundant with the `typed` option.

### `inlineTags`

List of tags to allow inline.

Defaults to array of `'link', 'linkcode', 'linkplain', 'tutorial', 'inheritDoc', 'label', 'include', and 'includeCode'`

### `jsxTags`

If this is set to `true`, all of the following tags used to control JSX output are allowed:

```
jsx
jsxFrag
jsxImportSource
jsxRuntime
```

For more information, see the babel documentation.

### `typed`

If this is set to `true`, additionally checks for tag names that are redundant when using a type checker such as TypeScript.

These tags are always unnecessary when using TypeScript or similar:

```
augments
callback
class
enum
implements
property
readonly
this
type
typedef
```

These tags are unnecessary on class members (where TypeScript has access
modifiers), but are allowed elsewhere (e.g., the `@public` release tag of
TSDoc/API Extractor on an exported function):

```
private
protected
public
```

These tags are unnecessary except when inside a TypeScript `declare` context:

```
abstract
access
class
constant
constructs
default
enum
export
exports
function
global
inherits
instance
interface
member
memberof
memberOf
method
mixes
mixin
module
name
namespace
override
property
requires
static
this
```

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|N/A|
|Recommended|true|
|Options|`definedTags`, `enableFixer`, `inlineTags`, `jsxTags`, `typed`|
|Settings|`tagNamePreference`, `mode`|
