# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI persistence and context system that generates session reports documenting critical commands, decisions, blockers, and solutions. Enables seamless collaboration between Claude, Gemini, and other AI clients by maintaining persistent context across sessions.

Reference `STARTER.md` (frozen copy) for complete project specifications.

## AI Responsibilities

### Claude Code's Responsibilities (YOU)
- **Generate session reports** - How-to guides with sarcastic humor
- **Merge summaries** - Combine summary-c.md + summary-g.md → summary.md
- **Update project index** - Maintain index.md with project overview
- **Commit and push to git** - Backup all work to remote at session end
- **Update summary-c.md** - Your session summaries

### Gemini's Responsibilities
- Update `summary-g.md` at session end only
- **Does NOT** generate reports automatically
- **Does NOT** push to git automatically
- **Does NOT** update index.md automatically
- Can invoke agents manually if requested by user

## File Structure

```
/
├── STARTER.md                      # Frozen reference (created by /init)
├── index.md                        # Project index (you create/update this)
├── reports/                        # Generated session reports (you create these)
│   └── YYYY-MM-DD-HH-MM-report.md  # Timestamped to allow multiple per day
└── agent-files/
    ├── starter.md                  # User-editable (only before /init)
    ├── ai/                         # AI-managed files
    │   ├── summary-c.md            # Claude's session summaries
    │   ├── summary-g.md            # Gemini's session summaries
    │   ├── summary.md              # Unified summary (read at session start)
    │   ├── claude.md               # This file (Claude-specific context)
    │   └── gemini.md               # Gemini-specific context (synced with claude.md)
    ├── agents/                     # Agent prompt templates
    │   ├── report-agent.md         # Report generation (you invoke this)
    │   ├── summary-agent.md        # Summary merging (you invoke this)
    │   ├── context-agent.md        # Context analysis (auto at session start)
    │   └── index-agent.md          # Project indexing (you invoke this)
    └── templates/                  # Workflow templates
        ├── session-start-template.md    # Session start workflow
        ├── session-end-template.md      # Session end workflow
        ├── summary-merge-template.md    # Manual summary merge
        ├── report-template.md           # Report format reference
        ├── summary-template.md          # Summary format reference
        └── session-template.md          # Session tracking reference
```

## Session Commands

### Starting a Session

**Follow:** `agent-files/templates/session-start-template.md`

**Default workflow:**
1. **Pull from git** - Run `git pull` to get latest changes from remote
2. **Check for external changes** - If git pull brought updates:
   - Review what changed using `git log` and `git diff`
   - Announce what was updated externally (e.g., "Gemini made changes to X")
3. **Invoke Context Agent** - Use Task tool to launch Context Agent:
   - Agent reads `agent-files/ai/summary.md`
   - Agent analyzes project state, blockers, allowers
   - Agent displays context analysis to user
4. **Announce session start** after Context Agent completes
5. **Begin monitoring** all activity for the session report

**Note:** User can customize workflow by editing the template file.

### Ending a Session

**Follow:** `agent-files/templates/session-end-template.md`

**Default workflow:**
1. **Ask user for report format preference:**
   - **Every command**: All commands in sequence (copy-paste script style)
   - **Key actions**: Important steps with context (skip trivial file operations)
   - **Recipe style**: Prerequisites + high-level steps + key commands only

2. **Invoke Report Agent** - Use Task tool to launch Report Agent:
   - Agent reads `agent-files/agents/report-agent.md`
   - Agent analyzes session conversation history
   - Agent generates how-to report with sarcastic, humorous tone
   - Agent writes to `reports/YYYY-MM-DD-HH-MM-report.md` (timestamped)

3. **Update `agent-files/ai/summary-c.md`** with session details organized into log categories using `agent-files/templates/summary-template.md`

4. **Invoke Summary Agent** - Use Task tool to launch Summary Agent:
   - Agent reads `agent-files/agents/summary-agent.md`
   - Agent merges `summary-c.md` and `summary-g.md`
   - Agent writes unified `agent-files/ai/summary.md`

5. **Invoke Index Agent (Optional)** - Use Task tool to launch Index Agent:
   - Agent reads `agent-files/agents/index-agent.md`
   - Agent updates `index.md` with current project state

6. **Commit and push to git** - Backup session work to remote:
   - Stage all changes with `git add -A`
   - Commit with descriptive message including what was accomplished
   - Push to remote with `git push origin master`

**Note:** User can customize workflow by editing the template file.

**IMPORTANT:** This full workflow is for Claude Code only. Gemini has a simplified workflow (see gemini.md) where they only update summary-g.md and do NOT generate reports or push to git.

### Merge Summaries (Independent Command)

**Trigger:** User says "Merge summaries" or "Sync summaries" or "Update summary.md"

**Follow:** `agent-files/templates/summary-merge-template.md`

**Purpose:** Merge summary-c.md and summary-g.md into unified summary.md without creating report or pushing to git.

**Use cases:**
- Mid-session sync between Claude and Gemini
- After detecting external changes
- Before switching AI clients
- Manual sync without full session end

**Actions:**
1. Invoke Summary Agent using Task tool:
   - Agent reads `agent-files/agents/summary-agent.md`
   - Agent merges both summary files
   - Agent writes to `agent-files/ai/summary.md`
   - Agent returns confirmation
2. Display confirmation to user with counts (sessions, blockers, allowers)

**Do NOT:**
- Create report in reports/
- Commit or push to git
- Modify source summary files

**Note:** User can customize merge logic by editing the template file.

## Agent System

Specialized sub-agents run independently using the Task tool to handle specific responsibilities.

### Available Agents

**Report Agent** (`agent-files/agents/report-agent.md`)
- **Role:** Friendly technical writer with sarcastic, humorous tone
- **Task:** Generate how-to style session reports
- **Invoked:** Automatically at session end, or say "Generate a report"
- **Output:** `reports/YYYY-MM-DD-report.md`
- **Personality:** Helpful tutor who makes docs fun ("This command actually worked on the first try. No, really.")

**Summary Agent** (`agent-files/agents/summary-agent.md`)
- **Role:** Professional data synthesizer
- **Task:** Merge `summary-c.md` and `summary-g.md` into unified `summary.md`
- **Invoked:** Automatically at session end, or say "Merge summaries"
- **Output:** `agent-files/ai/summary.md`
- **Personality:** Methodical, precise, organized

**Context Agent** (`agent-files/agents/context-agent.md`)
- **Role:** Analytical assistant for project awareness
- **Task:** Review project state, surface blockers/allowers, identify relevant context
- **Invoked:** Automatically at session start, or say "Check context"
- **Output:** Display analysis in conversation (no file writes)
- **Personality:** Helpful, thorough, insightful

**Index Agent** (`agent-files/agents/index-agent.md`)
- **Role:** Meticulous project organizer
- **Task:** Maintain high-level project index
- **Invoked:** Optional at session end, or say "Update index"
- **Output:** `index.md` in project root
- **Personality:** Organized librarian, methodical

### How to Invoke Agents

Agents are invoked using the Task tool with `subagent_type: "general-purpose"`. The session templates contain specific prompts that reference each agent's template file.

**Manual invocation examples:**
```
User: "Generate a report"
→ Invoke Report Agent

User: "Merge summaries"
→ Invoke Summary Agent

User: "Check context"
→ Invoke Context Agent

User: "Update index"
→ Invoke Index Agent
```

Each agent runs independently, analyzes conversation history/files, and returns results to you for display to the user.

## Log Categories

Organize information into four types:

### 1. Activity Logs
- Commands run
- Files changed
- Actions taken during session

### 2. Decision Logs
- Architectural choices made
- Rationale for "why we did X not Y"
- Trade-offs considered

### 3. Reference Logs
- Links consulted
- Documentation referenced
- Tutorials followed
- External resources used

### 4. Error Logs
- Failed attempts
- Debugging notes
- Issues encountered and resolved

## Blockers vs Allowers

### Blockers
Issues preventing progress that need resolution across sessions. Examples:
- Configuration that doesn't work with installed dependencies
- Missing information needed to proceed
- Errors that stopped development

### Allowers
Configurations, commands, or code that made something work successfully. These are reference points for reproducing solutions. Examples:
- The exact command that fixed an issue
- Working configuration discovered through trial
- Code pattern that solved a problem

## Summary File Contents

Track across sessions:
- Activity timestamps
- Commands executed
- Files modified
- Cross-references between related projects
- Blockers and allowers
- Annotations (reminders about previous solutions)
- Daily highlights

## Agent System

Four specialized agents manage files and maintain context:

### Summary Agent
Merges `summary-c.md` and `summary-g.md` into unified `summary.md`, extracting common patterns and reconciling conflicts.

### Context Agent
Monitors blockers and allowers, flags unresolved issues across sessions, surfaces relevant annotations when similar work is detected.

### Index Agent
Maintains `index.md` with project status, tracks cross-project relationships, updates timestamps.

### Report Agent
Generates clean markdown reports from agent files, using AI to determine what was accomplished.

## Design Principles

- **Creates readable, simple, and clean documentation** of work accomplished
- **AI-agnostic format** - Markdown with clear section headers for universal parsing
- **Lowercase convention** - All managed files use lowercase names for consistency
- **Single project focus** - One `agent-files/` directory per project repository
- **Session-based workflow** - Explicit `/start-session` and `/end-session` commands for clear boundaries
- **Retrieval-focused** - Optimize for quickly finding "where did I leave off?"

## Cross-AI Continuity

When switching between Claude and Gemini:
1. Previous AI updated its summary file (`summary-c.md` or `summary-g.md`)
2. Agent merged both into `summary.md`
3. New AI reads `summary.md` at `/start-session` and picks up where you left off
4. Both AIs contribute to the same project understanding

## Important Notes

- **starter.md** is only user-editable before `/init`
- After `/init`, reference **STARTER.md** (frozen copy) for specifications
- **claude.md** ↔ **gemini.md** must stay synced
- All files in `ai/` are AI-managed and should be manually committed to git
- Session reports in `reports/` provide clean documentation of work accomplished
