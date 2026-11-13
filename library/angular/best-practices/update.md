---
title: "Keeping your Angular projects up-to-date"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/best-practices/update.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Keeping your Angular projects up-to-date

Just like Web and the entire web ecosystem, Angular is continuously improving.
Angular balances continuous improvement with a strong focus on stability and making updates straightforward.
Keeping your Angular application up-to-date enables you to take advantage of leading-edge new features, as well as optimizations and bug fixes.

This document contains information and resources to help you keep your Angular applications and libraries up-to-date.

For information about our versioning policy and practices — including support and deprecation practices, as well as the release schedule — see Angular versioning and releases.

HELPFUL: If you are currently using AngularJS, see Upgrading from AngularJS.
_AngularJS_ is the name for all v1.x versions of Angular.

## Getting notified of new releases

To be notified when new releases are available, follow @angular on X (formerly Twitter) or subscribe to the Angular blog.

## Learning about new features

What's new? What's changed? We share the most important things you need to know on the Angular blog in release announcements.

To review a complete list of changes, organized by version, see the Angular change log.

## Checking your version of Angular

To check your application's version of Angular use the `ng version` command from within your project directory.

## Finding the current version of Angular

The most recent stable released version of Angular appears on npm under "Version." For example, `16.2.4`.

You can also find the most current version of Angular by using the CLI command `ng update`.
By default, `ng update` (without additional arguments) lists the updates that are available to you.

## Updating your environment and apps

To make updating uncomplicated, we provide complete instructions in the interactive Angular Update Guide.

The Angular Update Guide provides customized update instructions, based on the current and target versions that you specify.
It includes basic and advanced update paths, to match the complexity of your applications.
It also includes troubleshooting information and any recommended manual changes to help you get the most out of the new release.

For simple updates, the CLI command `ng update` is all you need.
Without additional arguments, `ng update` lists the updates that are available to you and provides recommended steps to update your application to the most current version.

Angular Versioning and Releases describes the level of change that you can expect based on a release's version number.
It also describes supported update paths.

## Resource summary

- Release announcements:
  Angular blog - release announcements

- Release details:
  Angular change log

- Update instructions:
  Angular Update Guide

- Update command reference:
  Angular CLI `ng update` command reference

- Versioning, release, support, and deprecation practices:
  Angular versioning and releases
