---
name: video-bug-repro
description: "Turns a screen recording of a bug into written reproduction steps with expected and actual results. Use when the user shares a video or a sequence of frames showing a bug, or asks to reproduce what happens in a recording."
metadata:
  id: MM-05
  stars: "1"
  nature: process
  mode: A
  wave: V4
  load: auto
---

# Video bug reproduction

**Core rule:** write only what the frames show, step by step with timestamps, and mark what cannot be seen.

## Procedure

1. If the video must be split, extract frames with a tool when installed: `ffmpeg -i <video> -vf fps=1 /tmp/frames/%04d.png`.
   - Check: frames exist, or the human provides screenshots.
2. Write the steps: timestamp, action seen (click, typing), screen state after it.
   - Check: each step has a timestamp and what changed.
3. Write expected versus actual at the failure moment.
   - Check: both are concrete.
4. Reproduce the steps (`reproduce-first`), ideally as an end-to-end test.
   - Check: the failure appears again, or the gap is reported.

## Stop and ask the human if

- Actions are not visible (keyboard shortcuts, data entered off screen).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I can guess the clicks between frames." | Mark them unknown and ask. |
| "Describe the video in general terms." | Steps need timestamps and exact labels. |

## Definition of done

- [ ] Timestamped steps, expected and actual written; reproduction attempted.
