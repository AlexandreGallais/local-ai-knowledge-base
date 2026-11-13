# AGENTS.md

This file belongs to the project. The team may change it: keep it short, in English, with one rule per line.
The common rules of the global base are loaded as well; this file only adds what is true for this project.

## Before your first task

1. Run `node /opt/local-ai-base/tools/base-version.ts`. Show its message to the user when it asks you to.
2. If the command fails because the file does not exist, tell the user that the global base is not installed, then stop.
3. If `.agents/profile.json` does not exist, load the skill `welcome` and follow it before anything else.

## This project

- Subject: not set yet. The skill `welcome` writes it.
- Profile: see `.agents/profile.json`.

## Project rules

- None yet. Add one line per rule that is true for this project only.
