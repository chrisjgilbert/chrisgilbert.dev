---
title: "Adventures in AI: my personal recipe saver app"
description: "It's finally live"
pubDate: 2026-05-08
---

I rewrote an entire app in the swimming pool last week.

Specifically, I rewrote my [perennial side project](/blog/lunch-hunch) — a personal recipe manager — from Next.js + FastAPI to Rails + Inertia, in fragments between lengths, on my phone!

The app is (hopefully) live at [cookery.gilbert.work](https://cookery.gilbert.work), the code is (expectantly) [on GitHub](https://github.com/chrisjgilbert/recipes).

## The itch (briefly)

The web is full of recipes wrapped in ads and split in mad layouts. I just want the ingredients and the method, in a consistent format I can search. Multi-part recipes — like this [low and slow pork shoulder](https://biggreenegg.co.uk/r/low-and-slow-pork-shoulder) with meat, rub and cook — are the thing off-the-shelf tools fumble. So: paste a URL, have an LLM extract structured data, end up with something searchable.

I've started this project more times than I'd like to admit. Next.js + FastAPI was the most recent attempt, and like the ones before it, it stalled.

## In the pool

I'd been chewing on the fact that the FastAPI version felt heavier than it needed to — too much code, deployment, etc — so I thought "I've always wanted to give Inertia.js a go with Rails and this app needs a snappy UI — why not!".

And by the time I got out of the pool there was a working Rails app with most of my features ported across. Deployment took a while longer as I was using Kamal for the first time and I needed to set up a Postgres container (I'd skipped past the DB choice a bit too eagerly — Postgres to make searching more powerful).

The app I'd started several times over, and over-promised my mother-in-law, was pretty much there for a V1.

The thing that struck me was that I'd done it on my phone, between lengths. Twenty years of thinking "writing software" means a desk and a laptop, and here I was dripping wet with a working app.

## Why Inertia

I love reactive UIs and I have enjoyed working React in the past. However, I hate the complexity that usually comes with it.

[Inertia.js](https://inertiajs.com) is the bit I'd been wanting to try for a while. You write controllers like a normal Rails app, but instead of rendering ERB you return props to a React page component. No API to design. No client-side router. No state-sync ceremony. The reactive bits stay reactive; everything else stays boring.

This connects to a thread from my [tooling post](/blog/my-ai-tooling-journey) — staying light. I'd rather spend the cognitive budget on the bits that matter: the data model, the small UX decisions, what the thing should actually do. Inertia means the boring layer stays boring.

## The age of personal apps

The recipe manager isn't the only one. I've got a budget app I built for myself and I'm working on a podcast / audio narrator thing. They all live on a single Hetzner box at gilbert.work. None would exist as off-the-shelf SaaS subscriptions I'd be willing to pay for, and none would have been worth my time to build, pre-AI.

The other thing about software you only use yourself is that you can be brutally pragmatic. Take auth: I store a bcrypt hash of my password as an environment variable on the box and check incoming passwords against it. No users table, no signup flow, no password reset emails. It's maybe ten lines of code and it works exactly as well as anything more sophisticated would for an audience of one.

This isn't revelatory — every engineer with a blog is making the personal-apps observation right now — but it is genuinely fun. Software that fits exactly the shape of my life, that I own end to end, on a server that costs less per month than a single SaaS subscription.

## What's next

Recipe import via image. I want to photograph a page from a cookbook, or a handwritten card, and have it parsed into the same structured format the URL importer produces. Probably multimodal via Claude or GPT — the URL importer is already LLM-driven, so it's a natural extension — but I want to play with the options before committing.

A year ago this would have been a multi-week project. Now it's plausibly a swimming pool's worth of work.
