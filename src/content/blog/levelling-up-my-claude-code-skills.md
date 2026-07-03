---
title: "Levelling up my Claude Code skills"
description: "I stopped babysitting Claude and started giving it a proper playbook."
pubDate: 2026-07-03
---

Until fairly recently my workflow was:

1. write a plan with an agent
2. agent implement plan and ask it to spin up sub agents where applicable
3. I then code review and verify the change (manually test it)

This was OK but I found I often spent my time babysitting the agent and being very involved in the work still.

I found the concept of developers with multiple Claude Code tabs open hard to wrap my head around! So I recently challenged myself to push a bit harder and lean into it more.

<figure>
    <img src="/multiple_tabs.jpg" alt="" loading="lazy">
    <figcaption>
      I’m starting to feel (at least) like a “power user” with multiple Claude Code tabs going at once
    </figcaption>
</figure>

## What changed

A couple of things nudged me in this direction:

- I started poking around the <a href="https://howborisusesclaudecode.com/" rel="external">“How Boris Uses Claude Code”</a> resource as a source of inspiration to see what those who know more than me are doing.
- I started using <a href="https://github.com/obra/superpowers" rel="external">Superpowers</a> which immediately produced better plans, specs, implementation plans, etc.

However I have found it pretty token hungry and there’s a fine balance where the amount of planning and pre implementation ceremony is worth it. I still tend to use it but I can see myself in the future having my own system or framework to operate with.

<figure>
    <img src="/superpowers.jpg" alt="" loading="lazy">
    <figcaption>
      The Superpowers plugin has helped me with a significant migration in the last week. It’s been running largely in the background with me occasionally checking up on it. It also wrote a manual testing plan for it to work through using my browser. This is the kind of work that would never have been prioritised pre-agentic-coding.
    </figcaption>
</figure>

## Starting to build my own agentic framework

As a result, I’ve started putting together a few things to enforce how I want my agents to operate:

### 1) Encode “taste” as skills

The <a href="https://github.com/chrisjgilbert/claude-ruby-quality" rel="external">Claude Ruby Quality</a> plugin provides a couple of skills that detect and remedy common code smells and test smells, by encoding canonical Ruby Science code smells and their fixes, and xUnit test patterns.

### 2) Turn milestones into commands

Commands that I run at common milestones: for example an `/open-pr` command that chains Anthropic produced engineering skills. This means when I check a PR I can keep my analysis high level and be confident it’s been code reviewed, refactored and verified. I then sometimes add a few comments and get those addressed before releasing.

I even have commands that can trigger our CI pipeline so I can stay in Claude Code.

### 3) Write a `CLAUDE.md` that enforces my defaults

My <a href="https://gist.github.com/chrisjgilbert/337d6b62c608cbe5eda34ade059c30f5" rel="external">CLAUDE.md</a> imparts some stylistic taste I want agents to adopt. I have taste when it comes to Rails apps that I want to enforce, and I find if left unattended, you end up with a `/services` directory containing a collection of random objects.

It enforces a 37Signals-style approach — `/models` only and `ViewComponent` by default — and prefers server-driven UI changes where possible.

---

## My “verify-review” command

Once an agent has implemented something, I have a `verify-review` command I run before opening a PR:

```
---
description: Run /code-review --fix, then verify the result in the browser with /verify
---

Do the following in order, completing each step before moving to the next:

1. Invoke the `code-review` skill with `--fix` to review the current diff and apply the findings to the working tree.

2. Once the fixes are applied, invoke the `verify` skill to confirm the change actually works by running the app and observing its behavior in the browser via the `claude-in-chrome` skill (load the `mcp__claude-in-chrome__*` tools through ToolSearch as that skill directs).

If step 1 applies no fixes (clean review), still run step 2 to verify the existing change. If verification surfaces a regression, report it clearly rather than silently re-editing.
```

I’ve found the code review particularly effective. Until recently I have been code reviewing and I now trust this skill enough that I only need to pay attention to the high level; I don’t need to go through every line critically.

The big thing for me is that the code-review skill spins up sub agents to review the diff from different angles — security, behaviour, and more. Having several independent reviewers each looking for something specific is really powerful.

It’s <a href="https://www.towardsdeeplearning.com/tired-of-claude-codes-over-engineering-ponytail-is-here-for-you-09b8891ceaad" rel="external">commonly known</a> that agents write superfluous code and often disobey YAGNI liberally. `/simplify` guards specifically against this, trimming back anything that didn’t need to be written.

The verification using Claude in Chrome is helpful too because I can easily see what’s being tested, or let it run in the background.

## Going all in on Claude Code (for now)

I’ve [previously said](/blog/my-ai-tooling-journey) I want to stay tool agnostic whilst things are changing so quickly; I bounce between Codex, Claude Code and Cursor. However recently I’ve given up my Codex and Cursor licences and gone all in on Claude Code.

This has unlocked a step change in productivity – and I think the concepts transfer neatly to other tools.

I’ve also heard a lot about <a href="https://www.reddit.com/r/theprimeagen/comments/1tzrmoz/creator_of_claude_code_i_dont_write_prompts/" rel="external">“loops”</a> being the new thing – that’s the next area I want to dig into.
