---
name: toolbox-distrobox
description: "Uses Toolbx or Distrobox on Fedora for interactive development environments sharing the home folder, and says when to prefer them over a dev container. Use when a tool must run with access to the desktop or home folder, when the user mentions toolbox or distrobox, or when choosing between them and a dev container."
metadata:
  id: CTR-10
  stars: "2"
  nature: reference
  mode: B
  wave: V3
  load: auto
---

# Toolbx and Distrobox

**Core rule:** use a dev container for project builds that must be reproducible; use Toolbx or Distrobox for personal tools that need the home folder or the desktop.

## Procedure

1. Choose with the table.
   - Check: the choice matches the need.
2. Create and enter: `toolbox create <name>` then `toolbox enter <name>`, or `distrobox create --name <name> --image <image>` then `distrobox enter <name>`.
   - Check: the prompt shows the container; `ls ~` shows your home.
3. Install tools inside through the internal repositories.
   - Check: the tool runs inside.

| Need | Choice |
| --- | --- |
| Reproducible project build and CI parity | dev container |
| Interactive tools with your home folder and desktop | Toolbx (Fedora images) or Distrobox (other distributions) |
| A GUI app from another distribution | Distrobox |

## This installation

<!-- FILL: what=whether toolbox and distrobox are installed; find=command -v toolbox distrobox; verify=toolbox --version and distrobox version print versions -->

<!-- FILL: what=images available from the internal registry for them; find=podman search on the internal registry or ask the human; verify=toolbox create with that image succeeds -->

## Stop and ask the human if

- The tool should run in the project's dev container instead (shared by the team).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Build the project in a toolbox." | It shares your home and differs per person; builds stop being reproducible. |
| "Files in the toolbox are isolated." | The home folder is shared with the host. |

## Definition of done

- [ ] Right environment chosen; container created from an internal image; tool works.

## Local completion checklist

- [ ] toolbox and distrobox availability
- [ ] Internal images
