# Try the heavy files on the workstation

The `parse` tools read a heavy file without opening it: its outline, then one part, then its images.
This guide checks them on files of the team. It takes about 15 minutes.

## Before

- The global base is installed (`guides/install.md`) and the project is equipped.
- Pick, in a project, one Adobe XD file of the team, and if you have them one Word, one Excel and one
  PDF file. Do not copy them anywhere else: everything stays on the workstation.

## 1. The command alone

In the dev container, at the root of the project:

```sh
node /opt/local-ai-base/tools/extract.ts path/to/screens.xd --depth 2
node /opt/local-ai-base/tools/extract.ts path/to/screens.xd --part S1
node /opt/local-ai-base/tools/extract.ts path/to/screens.xd --images
```

Note:

- [ ] The outline lists every screen of the file, with its size.
- [ ] Inside a screen, the groups follow the order a person reads: top to bottom, then left to right.
- [ ] The texts of `--part S1` are the texts of the first screen, at the right place.
- [ ] The images are in `.agents/work/extract/<hash>/images/` and open.
- [ ] No path of the author's machine (`/Users/...`, `C:\...`) appears anywhere.
- [ ] Time of the first call, then of the second (served from the cache).

## 2. In OpenCode

Open OpenCode at the root of the project, then ask:

> Describe the screens of `path/to/screens.xd` and how each one is organized.

Note:

- [ ] The AI calls `parse_outline`, then `parse_part` on one or two screens.
- [ ] It never calls `read` on the `.xd` file: the policy refuses it if it tries.
- [ ] Its answer names the screens and their groups as in the outline.
- [ ] Tokens of the session (shown by OpenCode).

Do the same with a Word, an Excel and a PDF file if you have them:

> Summarize section 2 of `path/to/spec.docx`.
> What does the sheet "Tanks" of `path/to/tanks.xlsx` compute?
> What does page 3 of `path/to/manual.pdf` say?

## What to send back

The ticked boxes, the times and the tokens; and, for a file that reads badly, its outline (without its
texts if they are internal), so that the reader can be corrected.
