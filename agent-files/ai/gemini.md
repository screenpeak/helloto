# GEMINI.md

This file provides guidance to Gemini CLI when working with code in this repository.

## Project Overview

AI persistence and context system that generates session reports documenting critical commands, decisions, blockers, and solutions. Enables seamless collaboration between Claude, Gemini, and other AI clients by maintaining persistent context across sessions.

Reference `STARTER.md` (frozen copy) for complete project specifications.

## File Structure

```
/
├── STARTER.md                      # Frozen reference (created by /init)
├── index.md                        # Project index (created by Index Agent)
├── reports/                        # Generated session reports (project root)
│   └── YYYY-MM-DD-HH-MM-report.md  # Created by Claude Code only
└── agent-files/
    ├── starter.md                  # User-editable (only before /init)
    ├── ai/                         # AI-managed files
    │   ├── summary-c.md            # Claude's session summaries
    │   ├── summary-g.md            # Gemini's session summaries (you manage this)
    │   ├── summary.md              # Unified summary (read at session start)
    │   ├── claude.md               # Claude-specific context
    │   └── gemini.md               # This file (Gemini-specific context)
    ├── agents/                     # Agent prompt templates
    │   ├── report-agent.md         # Report generation (Claude Code only)
    │   ├── summary-agent.md        # Summary merging
    │   ├── context-agent.md        # Context analysis
    │   └── index-agent.md          # Project indexing (Claude Code only)
    └── templates/                  # Workflow templates
        ├── session-start-template.md    # Session start workflow
        ├── session-end-template.md      # Session end workflow (for Claude)
        ├── summary-merge-template.md    # Manual summary merge
        ├── report-template.md           # Report format reference
        ├── summary-template.md          # Summary format reference
        └── session-template.md          # Session tracking reference
```

## AI Responsibilities

### Claude Code's Responsibilities
- Generate session reports (how-to guides with sarcastic humor)
- Merge summaries into unified `summary.md`
- Update project `index.md`
- Commit and push to git at session end
- Update `summary-c.md`

### Gemini's Responsibilities (YOU)
- Update `summary-g.md` at session end only
- **DO NOT** generate reports automatically
- **DO NOT** push to git automatically
- **DO NOT** update index.md automatically
- Can invoke agents manually if requested by user

## Session Commands

### Starting a Session

**Follow:** `agent-files/templates/session-start-template.md`

**Default workflow:**
1. **Pull from git** - Run `git pull` to get latest changes from remote
2. **Check for external changes** - If git pull brought updates:
   - Review what changed using `git log` and `git diff`
   - Announce what was updated externally (e.g., "Claude made changes to X")
3. **Invoke Context Agent** - Use Task tool to launch Context Agent:
   - Agent reads `agent-files/ai/summary.md`
   - Agent analyzes project state, blockers, allowers
   - Agent displays context analysis to user
4. **Announce session start** after Context Agent completes
5. **Begin monitoring** all activity for summary update

**Note:** User can customize workflow by editing the template file.

### Ending a Session

**IMPORTANT: Gemini has simplified session end workflow.**

**When user says "End session" or "Wrap up session":**

1. **Update `agent-files/ai/summary-g.md`** with session details:
   - Session date and timestamp
   - Activity logs (commands, files, actions)
   - Decision logs (architectural choices, rationale)
   - Reference logs (links, documentation, resources)
   - New blockers (if any)
   - New allowers (solutions that worked)
   - Session highlights

   Use format from `agent-files/templates/summary-template.md`.

2. **Display confirmation to user:**
   ```
   ✅ Session ended - [YYYY-MM-DD HH:MM]

   📊 Summary updated: agent-files/ai/summary-g.md

   Session Summary:
   - Duration: [HH:MM]
   - Commands executed: [N]
   - Files modified: [N]
   - Blockers encountered: [N]
   - Solutions discovered: [N]

   Context saved for next session.

   Note: Report generation and git push are handled by Claude Code.
   If you want to merge summaries now, say "Merge summaries".
   ```

3. **That's it!** Do NOT:
   - ❌ Generate report (Claude Code's job)
   - ❌ Invoke Report Agent
   - ❌ Invoke Summary Agent (unless user says "merge summaries")
   - ❌ Invoke Index Agent
   - ❌ Commit to git
   - ❌ Push to remote

### Merge Summaries (Independent Command)

**Trigger:** User says "Merge summaries" or "Sync summaries" or "Update summary.md"

**Follow:** `agent-files/templates/summary-merge-template.md`

**Purpose:** Merge summary-c.md and summary-g.md into unified summary.md without creating report or pushing to git.

**Use cases:**
- Mid-session sync between Claude and Gemini
- After detecting external changes
- Before switching to Claude Code
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

Specialized sub-agents run independently using the Task tool to handle specific responsibilities.

### Available Agents

**Context Agent** (`agent-files/agents/context-agent.md`)
- **Role:** Analytical assistant for project awareness
- **Task:** Review project state, surface blockers/allowers, identify relevant context
- **Invoked:** Automatically at session start, or say "Check context"
- **Output:** Display analysis in conversation (no file writes)
- **Personality:** Helpful, thorough, insightful

**Summary Agent** (`agent-files/agents/summary-agent.md`)
- **Role:** Professional data synthesizer
- **Task:** Merge `summary-c.md` and `summary-g.md` into unified `summary.md`
- **Invoked:** Say "Merge summaries" (manual invocation only)
- **Output:** `agent-files/ai/summary.md`
- **Personality:** Methodical, precise, organized

**Report Agent** (`agent-files/agents/report-agent.md`)
- **Role:** Friendly technical writer with sarcastic, humorous tone
- **Task:** Generate how-to style session reports
- **Invoked:** **ONLY if user explicitly asks** "Generate a report"
- **Output:** `reports/YYYY-MM-DD-HH-MM-report.md`
- **Personality:** Helpful tutor who makes docs fun
- **Note:** Normally Claude Code's responsibility

**Index Agent** (`agent-files/agents/index-agent.md`)
- **Role:** Meticulous project organizer
- **Task:** Maintain high-level project index
- **Invoked:** **ONLY if user explicitly asks** "Update index"
- **Output:** `index.md` in project root
- **Personality:** Organized librarian, methodical
- **Note:** Normally Claude Code's responsibility

### How to Invoke Agents

**Automatic (Session Start):**
- Context Agent launches automatically

**Manual Invocation:**
```
User: "Check context"
→ Invoke Context Agent

User: "Merge summaries"
→ Invoke Summary Agent

User: "Generate a report" (explicit request)
→ Invoke Report Agent

User: "Update index" (explicit request)
→ Invoke Index Agent
```

## Design Principles

- **Creates readable, simple, and clean documentation** of work accomplished
- **AI-agnostic format** - Markdown with clear section headers for universal parsing
- **Lowercase convention** - All managed files use lowercase names for consistency
- **Single project focus** - One `agent-files/` directory per project repository
- **Session-based workflow** - Explicit session start and end for clear boundaries
- **Retrieval-focused** - Optimize for quickly finding "where did I leave off?"
- **Division of labor** - Claude Code handles reports/git, Gemini handles summary-g.md

## Cross-AI Continuity

When switching between Claude and Gemini:
1. Previous AI updated its summary file (`summary-c.md` or `summary-g.md`)
2. Summary may or may not be merged into `summary.md` (depends on workflow)
3. New AI reads `summary.md` at session start and picks up where you left off
4. Both AIs contribute to the same project understanding

## Important Notes

- **starter.md** is only user-editable before `/init`
- After `/init`, reference **STARTER.md** (frozen copy) for specifications
- **claude.md** ↔ **gemini.md** must stay synced in concept, but workflows differ
- Your main job: Update `summary-g.md` at session end
- Claude Code's job: Generate reports, update index, push to git
- All files in `ai/` are AI-managed
- Only update `summary-g.md`, not other files (unless explicitly asked)
