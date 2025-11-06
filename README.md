# AI Report Assistant - Starter Kit

Complete starter kit for AI-powered session documentation and context persistence across Claude, Gemini, and other AI assistants.

## What is This?

A ready-to-use system that helps AI assistants:
- 📝 Generate **how-to reports** from your work sessions
- 🔄 **Maintain context** across different sessions and AI clients
- 🎯 Track **blockers** (problems) and **allowers** (solutions)
- 📊 Create **reproducible documentation** with step-by-step guides
- 🔁 **Sync via git** automatically at session start/end

## Quick Start

### 1. Copy to Your Project

```bash
# Copy the agent-report-assistant folder to your project root
cp -r agent-report-assistant/* /path/to/your/project/
```

### 2. Initialize with AI

In Claude Code or Gemini CLI:
```
/init
```

The AI will read `agent-files/starter.md` and create `STARTER.md` (frozen reference).

### 3. Start Your First Session

```
Let's start a session
```

The AI will:
- Pull latest changes from git
- Load context from previous sessions
- Begin monitoring your work

### 4. End the Session

```
Let's end this session and document everything
```

The AI will:
- Ask for report format preference (Every command / Key actions / Recipe style)
- Generate a how-to report in `reports/YYYY-MM-DD-report.md`
- Update summaries for future sessions
- Commit and push to git

## What's Included

```
agent-report-assistant/
├── README.md                           # This file
├── reports/                            # Generated how-to reports go here
└── agent-files/
    ├── starter.md                      # Project specifications (edit before /init)
    ├── ai/                             # AI-managed context files
    │   ├── claude.md                   # Claude instructions
    │   ├── gemini.md                   # Gemini instructions
    │   ├── summary-c.md                # Claude's session history
    │   ├── summary-g.md                # Gemini's session history
    │   └── summary.md                  # Unified summary
    ├── agents/                         # Agent prompt templates
    │   ├── report-agent.md             # Report generation (sarcastic tutor)
    │   ├── summary-agent.md            # Summary merging
    │   ├── context-agent.md            # Context analysis
    │   └── index-agent.md              # Project indexing
    └── templates/                      # Editable templates (customize as needed!)
        ├── init-template.md            # Customize /init workflow
        ├── session-start-template.md   # Customize session start workflow
        ├── session-end-template.md     # Customize session end workflow
        ├── summary-merge-template.md   # Manual summary merge
        ├── report-template.md          # Customize how-to report format
        ├── session-template.md         # Customize session tracking
        └── summary-template.md         # Customize summary format
```

## Features

### How-To Reports with Personality
Every session generates a reproducible guide with a sarcastic, humorous tone:
- **Objective**: What the guide teaches
- **Prerequisites**: Required tools/configs
- **Step-by-Step**: Commands with context and personality
- **Blockers**: Issues encountered
- **Allowers**: Solutions that worked
- **Results**: Final deliverables
- **Style**: Friendly tutor with jokes ("This command actually worked on the first try. No, really.")

### Specialized Agent System
Four independent agents handle specific tasks:
- **Report Agent**: Generates how-to reports with sarcastic humor
- **Summary Agent**: Merges Claude and Gemini summaries
- **Context Agent**: Analyzes project state and surfaces blockers
- **Index Agent**: Maintains project overview in index.md

### Cross-AI Continuity
Switch seamlessly between Claude and Gemini:
- Each AI maintains its own summary
- Summaries merge automatically via Summary Agent
- Next AI picks up exactly where you left off
- Context Agent loads full history at session start

### Git Integration
Automatic version control:
- `git pull` at session start (loads external changes)
- `git push` at session end (backs up work)

### Format Options
Choose report detail level:
- **Every command**: Complete script (copy-paste ready)
- **Key actions**: Important steps (skip trivial)
- **Recipe style**: High-level guide (mixed)

## Example Session

```
User: Let's start a session
AI: [Pulls from git, loads context, announces status]

User: [Works on project]
AI: [Monitors commands, decisions, configurations]

User: Let's end this session and document everything
AI: What detail level for the how-to report?
    - Every command
    - Key actions
    - Recipe style

User: Key actions
AI: [Generates how-to report, updates summaries, commits & pushes]

    ✅ Created reports/2025-11-06-report.md
    ✅ Updated agent-files/ai/summary-c.md
    ✅ Merged into agent-files/ai/summary.md
    ✅ Pushed to git
```

## Configuration

### Customize Templates (Optional)

**Before /init**, edit templates in `agent-files/templates/` to customize behavior:

- **init-template.md** - Change what happens during `/init`
- **session-start-template.md** - Modify session start workflow (git pull, context loading, etc.)
- **session-end-template.md** - Modify session end workflow (report generation, git push, etc.)
- **report-template.md** - Change how-to report structure
- **session-template.md** - Modify session tracking format
- **summary-template.md** - Change summary file structure

### Edit Starter File

Customize `agent-files/starter.md`:
- Project-specific goals
- Custom log categories
- Additional agent types
- Modified design principles

### After /init

Reference `STARTER.md` (frozen copy) - do not edit `starter.md` after initialization. To make changes, edit the templates and reinitialize.

## Tips

1. **Customize before /init**: Edit templates in `agent-files/templates/` to match your workflow
2. **Customize agent personalities**: Edit `agent-files/agents/*.md` to change agent tone and behavior
3. **Commit often**: Session end auto-commits, but you can commit manually during work
4. **Use blockers/allowers**: Track problems and solutions for future reference
5. **Switch AIs freely**: Summaries merge automatically via Summary Agent
6. **Review reports**: How-to guides make onboarding and knowledge transfer easy (and fun to read!)
7. **Invoke agents manually**: Say "Check context", "Merge summaries", "Update index", or "Generate a report"
8. **Workflow templates**: Change session-start/end behavior by editing the template files

## Requirements

- Git repository
- Claude Code or Gemini CLI (or compatible AI assistant)
- Text editor (for viewing/editing markdown files)

## Support

This is a self-contained starter kit. All specifications are in:
- `agent-files/starter.md` - Complete system documentation
- `STARTER.md` - Frozen reference (created after /init)

## License

Free to use and modify for your projects.

---

**Ready to start?** Copy this folder to your project and run `/init`!
