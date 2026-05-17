# AGENTS.md

## Project Overview

This is a Vite React Tailwind static website for Wheeler High School HOSA.

The site helps students:
- choose realistic HOSA competitive events
- understand event requirements in plain English
- see whether an event is a test, upload, presentation, portfolio, recognition exam, or skills/performance event
- build a weekly training plan
- prepare for Georgia SLC
- help officers organize competition preparation

## Active App File Rule

Before editing code, always inspect src/main.jsx and identify the active app component.

As of the redesign, the live app likely uses:
src/StudentPortal.jsx

Do not make meaningful feature changes only inside unused legacy files such as src/App.jsx unless src/main.jsx imports them.

If old files exist, preserve them unless asked to delete them.

## Development Commands

Install dependencies:
npm install

Run local dev server:
npm run dev

Build:
npm run build

## Hard Rules

1. Do not remove existing event data.
2. Do not remove quiz/scoring logic unless the task explicitly says to improve it.
3. Do not add a backend.
4. Do not add login/authentication.
5. Do not hardcode private student data.
6. Do not include student names, emails, scores, medical information, or private Google Form edit links.
7. Keep the site static and Vercel-compatible.
8. Every pull request must pass npm run build.
9. Use readable text contrast.
10. Add cursor-pointer to clickable controls.
11. Keep mobile layout clean.
12. Use student-friendly plain English.
13. Do not create giant walls of text.
14. Do not redesign the whole app unless the task explicitly asks for a redesign.
15. Prefer focused changes over massive rewrites.

## UI Style

Use a clean high school leadership dashboard style:
- navy
- white
- light gray
- medical teal accents
- readable cards
- clear buttons
- strong mobile layout
- professional but student-friendly

Avoid:
- low contrast text
- text-white on white/light cards
- text-slate-300 or text-slate-400 on light backgrounds
- tiny unreadable labels
- decorative complexity that hurts usability

## HOSA Content Style

Use plain student language.

Each event should help students understand:
- what the event is
- who it fits
- who should avoid it
- whether it requires a test
- whether it requires an upload
- whether it requires presentation
- what to do first this week
- what evidence to collect
- what mistakes to avoid
- what officers should coach

Always include a Georgia SLC verification note when process rules, uploads, or deadlines may vary.

## Pull Request Expectations

Every PR summary should include:
- what changed
- what files changed
- how to test
- confirmation that npm run build passes
- whether active app file was edited
- whether event data was preserved
- whether any private data was added
