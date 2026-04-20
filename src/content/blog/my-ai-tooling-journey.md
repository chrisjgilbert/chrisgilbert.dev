---
title: "My AI tooling journey"
description: "From Copilot to Cursor to Claude Code to Codex — how my AI coding workflow has evolved, and where I think it's heading."
pubDate: 2026-04-20
draft: true
---

Like a lot of engineers, my AI tooling journey started with GitHub Copilot. Method-level autocomplete, a bit of help with boilerplate. As a Ruby developer it was handy for the obvious stuff — `initialize` methods, attribute readers — but it was limited and often noisy.

Useful. Not transformative.

## Cursor, and my first wow moment

What dragged me into Cursor was that it could autocomplete more than just method names. I could describe a test in plain English and it would write it. The agent panel was an early glimpse of where this was all clearly heading.

I remember working with a designer who needed some data for his mockups. I had Cursor knock up a script that pulled data out of our database into something he could use. Twenty minutes. The script was maybe 100 lines, pretty hacky — but the kind of thing that would have eaten half a day if I'd written it myself. That was my first real wow moment with generative AI, as opposed to fancy autocomplete.

It still had rough edges. Autocomplete was often wrong and you'd end up rewriting 20–30% of whatever it produced. Agent mode felt essentially one-shot. I tried writing plans out in text files and pointing the agent at them, but I never clicked with that workflow.

## Claude Code

Claude Code was the tool that actually moved the needle.

I like working in the terminal. I never loved Cursor's agent panel tucked away as a secondary feature inside a code editor — it always felt like the agent was the main event being treated as a side dish. Claude Code put the agentic workflow front and centre.

Opus 4.5 was a noticeable step up in output quality. But the real game changer was plan mode — being able to go back and forth, pull in the files that mattered, talk through architectural decisions, and only then hit execute. It felt natural. I still get a lot of value out of the background tasks I set up around it, code review being the obvious one.

## Codex

By the start of '26 I'd shifted from roughly 50/50 — half the code through Claude Code, half by hand — to an agent-first approach. That's when I moved to Codex.

I write very little code myself these days. It's Codex first, almost always. The UI suits me: minimalistic, diffs on one side, conversation on the other. Git worktrees are a click away. MCP connectors are easy to set up.

## Staying light

One thing I've noticed about myself with these tools: I don't have the time or energy to go deep on any single one. I use them day to day. If they work for me, great. If they don't, they don't.

I don't run A/B tests between models. I don't heavily customise setups. My strong belief is that whatever we're using right now is not what we'll be using in twelve months.

That belief has been vindicated more than once. I never bothered setting up Git worktrees with Claude Code because it was too much hassle — in Codex it's a click. I haven't dug deeply into Codex's skills and connectors beyond the low-friction ones either. Every time I've resisted over-investing, the next generation has turned clunky workflows into trivial ones.

## What's next

I'm still reviewing code the way I'd review a junior's work. The Claude code review task I set up helps — Codex writes, Claude reviews — but what would it look like if that whole loop were automated? A tight spec at the start, an agent to write, another to review, some AI-driven QA and automated testing on top, and a final check against the spec. In that world most errors become spec errors — a failure to describe what you actually wanted upfront. That reframes the job quite significantly.

Tied to that, I want to lean into TDD. Plan mode in Claude Code was the single biggest jump in output quality I've experienced — having the model think before it types made everything downstream better. My hunch is that writing the test first will do the same thing again. A failing test is just a very precise spec, and these tools are at their best when the spec is tight.

I'm also curious about writing code on mobile. I've been sceptical of mobile as a form factor for engineering work, but I've started using Claude Code on mobile for side projects and small hunches. It's a faster-horses situation — I can't quite picture what I want until someone shows it to me. Next on the list is Opus 4.7 and running Claude Code inside the Claude desktop app.
