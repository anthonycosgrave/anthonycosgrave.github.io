---
title: "Web Accessibility with FastHTML"
layout: layouts/post.njk
tags: [web-accessibility, fasthtml]
series: "fasthtml-web-a11y"
order: 0
permalink: "/fasthtml-web-a11y/"
date: 2025-11-15
description: "An on-going series introducing web accessibility concepts aimed at beginners using FastHTML."
ogImage: /fasthtml-web-a11y/social/intro.png
---

<table-of-contents selector="h2, h3, h4, h5" summary="Table Of Contents"></table-of-contents>

## Introduction

Web Accessibility (web a11y) can seem overwhelming. This ongoing series focuses on practical web a11y examples and real-world contexts to show how small changes can meaningfully improve accessibility for *everyone*. It is not a full accessibility or legal compliance guide, but a starting point for building more inclusive experiences - whether you're working on a larger project, experimenting at home, or prompting your favourite LLM.

## Series Guide

Some people rely on [assistive technologies](assistive-technologies) (AT) to help them use the web. These tools use the [accessibility tree](intro-accessibility-tree) to understand what's on a page and how people can interact with it. The [Web Content Accessibility Guidelines (WCAG)](wcag-basics) detail what needs to be in place to make content accessible.

Set the [page language](set-the-language) so AT doesn't have to *guess* and confusingly mispronounce things. Give each page a clear [title](set-the-page-title) so everyone knows where they are. Don't block people from [zooming or resizing](do-not-disable-zoom); everyone should be able to read comfortably.

Structure your content clearly. Use proper [headings](headings) to help sighted users scan and AT users jump between sections. Add [landmarks](landmarks) to help AT users navigate the page and the site. Include a [skip link](skip-links) so people can bypass repeated content quickly.

Even with good structure, content can still be hard to read. Avoid [low-contrast text and colours](low-contrast-text) so everyone can enjoy your content, and don't rely on [colour alone](do-not-rely-on-colour-alone) to convey information.

Sleek visual designs are great, but AT cannot guess what links or buttons do if the accessibility tree information isn't there. Avoid creating [empty links](empty-links) and [empty buttons](empty-buttons); if people can't tell what something does, they won't click it.

Some people rely entirely on keyboards. They should be able to use your site [without a mouse](keyboard-navigation), and it should always be clear where focus is by using accessible [focus indicators](focus-indicators). If you use Pico CSS, you can improve its default [focus indicators](picocss-focus-indicator).

Images, charts and diagrams often communicate information visually. Provide [accessible text descriptions for images](accessible-text-descriptions-for-images) so that information is also available to people using AT.

## Accompanying code examples

To accompany the posts, where relevant, I've created code examples using [FastHTML](https://fastht.ml/). They're based on a fictional site called "The Dunning-Kruger Dispatch", with some intentionally poor or contrived code to illustrate specific web accessibility problems (Some might say the attempts are humour are also "poor or contrived"), that readers can attempt to resolve.

The repository is [FastHTML-web-a11y](https://github.com/anthonycosgrave/fasthtml-web-a11y).

## Software used

More details on screen readers is available in the [assistive technologies](assistive-technologies) post. For many examples in this series, I use [NonVisual Desktop Access (NVDA)](https://www.nvaccess.org/download/) and the [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) screen reader, as I am on working on Windows.

If you are using MacOS, [VoiceOver](https://support.apple.com/en-ie/guide/voiceover/welcome/mac) is the built-in screen reader on that platform. 

NVDA, Narrator and VoiceOver are types of screen readers that "announce" content via Text-To-Speech and provide navigational aids. 

## Series Index

Here are the individual posts in the series. It is recommended to read them in order, as concepts build on each other.

1. [An overview of Assistive Technologies](assistive-technologies)
2. [A brief introduction to the accessibility tree](intro-accessibility-tree)
3. [The basics of the Web Content Accessiblity Guidelines (WCAG)](wcag-basics)
4. [Set the page language](set-the-language)
5. [Set the page title](set-the-page-title)
6. [Don't prevent users from zooming](do-not-disable-zoom)
7. [Headings create accessible page structures](headings)
8. [Landmarks help screen reader users navigate](landmarks)
9. [Skip Links: Shortcuts for Keyboard Users](skip-links)
10. [Don't use low contrast text](low-contrast-text)
11. [Don't rely on colour alone](do-not-rely-on-colour-alone)
12. [Don't create empty links](empty-links)
13. [Don't create empty buttons](empty-buttons)
14. [Keyboard Accessibility Basics](keyboard-navigation)
15. [Focus Indicators Are the Keyboard User's Cursor](focus-indicators)  
16. [Creating a more accessible Pico CSS Focus Indicator](picocss-focus-indicator)   
17. [Provide Accessible Text Descriptions for Your Images](accessible-text-descriptions-for-images)