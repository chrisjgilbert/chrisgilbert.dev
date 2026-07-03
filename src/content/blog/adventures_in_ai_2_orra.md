---
title: "Adventures in AI: personal podcast generator"
description: "Building a personal tool to learn about things via audio whilst on the move"
pubDate: 2026-06-02
---

Music and audio is a big passion of mine; I worked as a Sound Engineer for several years before becoming a Software Engineer, and played in bands for many years too.

[OpenAI's recent announcement on their audio tooling](https://www.youtube.com/watch?v=JOu8v6CBjkE) got me itching to play with what's available.

For a while I've wanted to learn about things via audio whilst on the move — it's a good way to get an overview of something without ploughing through an article or a textbook.

## Orra

So I built another personal app that solves a very specific need: wanting to learn about things via audio whilst out and about.

The result was [Orra](https://github.com/chrisjgilbert/orra) – a personal podcast / audio narration tool. I give it a topic and a target duration and it hands back an MP3.

<figure>
    <img src="/orra.png" alt="" loading="lazy">
    <figcaption>
        The episode list ranges from "Your First AI Agent Loop Explained With Tomatoes" to "Saints Relegated Faster Than Anyone In History" — solid range for a tool built for an audience of one.
    </figcaption>
</figure>

## How it works

It's a Flask app: I give it a description of what I want to learn about and a target duration, that gets sent to an OpenAI LLM with a system prompt telling it to write me a transcript, and an OpenAI text-to-speech model turns that into an audio file.

I also played around with [ElevenLabs](https://elevenlabs.io/), and the quality is genuinely impressive. I stuck with OpenAI's model in the end because it's significantly cheaper and plenty good enough for my needs — it doesn't need to be VO quality.

A 15 minute episode costs a few dollars, so it's not free, but it's worth it and I make a few a month.

The app has a SQLite DB on a Hetzner box that gets wiped on every deploy. That's fine — I listen once and download the MP3 if I want to keep it, and wiping the DB saves me building any UI for managing a growing pile of episodes.

## What's next

I'm curious about doing more in the AI / audio space. I've had an idea kicking around for interactive audiobooks — speak to characters, shape the story, the way old adventure books let you jump to different pages.

ElevenLabs is probably powerful enough to pull that off. I'm also curious about [Suno](https://suno.com/) — I haven't written any music in years, but it's the kind of thing that could drag me back into a studio (or at least back onto the laptop).
