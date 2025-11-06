# AI Persistence & Context System

A documentation, note taker and report generator that that leverages AI assistants remember context across sessions and platforms

## Core Concept

Generate a report with the most critical commands and steps ran for documentation purposes. This system enables seamless collaboration between Claude, Gemini, and other AI clients by maintaining persistent context across sessions. Each AI maintains its own working memory while contributing to a unified project understanding.

The system generates summary reports documenting workflows, configurations, decisions, and blockers - allowing you to pick up exactly where you left off, regardless of which AI client you're using.

### Initialization Process

1. User creates and edits `starter.md` to define their project
2. User runs `/init` with their AI client (Claude Code or Gemini CLI)
3. AI reads `starter.md` and executes the following steps:

**Step 1: Create Directory Structure**
```bash
mkdir -p agent-files/ai agent-files/templates reports
```

**Step 2: Create Frozen Reference**
```bash
cp agent-files/starter.md STARTER.md
```

**Step 3: Create AI Summary Files**
Create `agent-files/ai/summary-c.md`, `summary-g.md`, and `summary.md` with initial empty structure (see Template Formats below).

**Step 4: Create AI Context Files**
Create `agent-files/ai/claude.md` and `agent-files/ai/gemini.md` with full specifications (see CLAUDE.md Specification and GEMINI.md Specification sections below).

**Step 5: Create Templates**
Create `agent-files/templates/summary-template.md`, `report-template.md`, and `session-template.md` (see Template Formats below).

**Step 6: Create Guide Files (Optional)**
Create `QUICK-REFERENCE.md` and `SESSION-DEMO.md` in project root for user reference.

4. User no longer edits `starter.md` after initialization

---

## Primary Goals

Ordered by implementation sequence:

1. **Session continuity** - Pick up where you left off across different sessions and AI clients
2. **Create summaries** - Generate session reports documenting commands, decisions, blockers, and allowers for easy reference
3. **Project reproducibility** - Create guides to recreate projects and configurations
4. **Automated documentation** - AI creates showcase content from project work

---

## AI Responsibilities

Different AI clients have different responsibilities in the system:

### Claude Code
- **Generate session reports** - How-to guides with sarcastic humor in `reports/YYYY-MM-DD-HH-MM-report.md`
- **Merge summaries** - Combine summary-c.md + summary-g.md → summary.md at session end
- **Update project index** - Maintain index.md with project overview
- **Commit and push to git** - Backup all work to remote at session end
- **Update summary-c.md** - Own session summaries

### Gemini CLI
- **Update summary-g.md** - Own session summaries at session end
- **Does NOT** generate reports automatically (only if explicitly requested)
- **Does NOT** push to git automatically (only if explicitly requested)
- **Does NOT** update index.md automatically
- Can invoke agents manually when requested by user

### Why Different Responsibilities?
- **Prevents conflicts** - Only one AI commits/pushes to git
- **Clear ownership** - Each AI owns their summary file
- **Reduced redundancy** - No duplicate reports or git pushes
- **Flexibility** - User can still ask either AI to do specific tasks manually

---

## File Structure

Single-project structure with AI-managed files organized in subfolders:

```
/
├── STARTER.md                      # Frozen reference (created by /init)
├── index.md                        # Project index (Claude Code creates/updates)
├── reports/                        # Session reports (Claude Code creates)
│   ├── YYYY-MM-DD-HH-MM-report.md  # Timestamped (multiple per day)
│   └── YYYY-MM-DD-HH-MM-report.md  # Timestamped (multiple per day)
└── agent-files/
    ├── starter.md                  # User-editable (only before /init)
    ├── ai/                         # AI-managed files (manually committed to git)
    │   ├── summary-c.md            # Claude's session summaries
    │   ├── summary-g.md            # Gemini's session summaries
    │   ├── summary.md              # Unified summary (read at session start)
    │   ├── claude.md               # Claude-specific context
    │   └── gemini.md               # Gemini-specific context
    ├── agents/                     # Agent prompt templates
    │   ├── report-agent.md         # Report generation (sarcastic tutor)
    │   ├── summary-agent.md        # Summary merging
    │   ├── context-agent.md        # Context analysis
    │   └── index-agent.md          # Project indexing
    └── templates/                  # Workflow templates
        ├── session-start-template.md    # Session start workflow
        ├── session-end-template.md      # Session end workflow
        ├── summary-merge-template.md    # Manual summary merge
        ├── report-template.md           # Report format reference
        ├── summary-template.md          # Summary format reference
        └── session-template.md          # Session tracking reference
```

### File Relationships

- `claude.md` ↔ `gemini.md` - Synced project instructions
- `summary-c.md` - Claude's working memory (updated at session end)
- `summary-g.md` - Gemini's working memory (updated at session end)
- `summary.md` - Unified context (read at session start, updated at session end)
- `reports/` - Session reports with highlights, configurations, and commands used

---

## Session Lifecycle

### Starting a Session

**Workflow instruction:** When starting, user tells AI to begin session.

The AI will:
1. **Pull from git** - Run `git pull` to get latest changes from remote
2. **Check for external changes** - If git pull brought updates:
   - Review what changed using `git log` and `git diff`
   - Add external changes to summary context
   - Announce what was updated externally (e.g., "Gemini made changes to X")
3. Read `ai/summary.md` to load context from previous sessions
4. Announce what it found:
   - Current status of the project
   - Open blockers that need attention
   - Recent changes from last session (including external changes)
   - Suggested next steps
5. Begin monitoring all activity for the session report

### During a Session

**Semi-automated tracking:** The AI continuously monitors and proposes what to document:
- Commands executed
- Files modified
- Decisions made
- Configurations changed
- Problems encountered and solved
- Resources referenced

The AI will propose documentation items for user approval before finalizing.

### Ending a Session

**Workflow instruction:** When ending, user tells AI to complete session documentation.

The AI will:
1. **Ask user for report format preference:**
   - **Every command**: All commands in sequence (copy-paste script style)
   - **Key actions**: Important steps with context (skip trivial file operations)
   - **Recipe style**: Prerequisites + high-level steps + key commands only

2. **Generate how-to report** in `reports/YYYY-MM-DD-HH-MM-report.md` (timestamped) with format:
   - **Title**: How to [Task Name] - YYYY-MM-DD
   - **Objective**: What this guide teaches
   - **Overview**: Brief summary of what was accomplished
   - **How to Replicate**: Step-by-step instructions (detail level based on user choice)
     - Prerequisites (tools, configs, starting state)
     - Steps with commands and context
     - Key configurations or code created
   - **Blockers**: New issues that need resolution
   - **Allowers**: Solutions that successfully unblocked work
   - **Results**: What you'll have after following the guide

3. Update `ai/summary-c.md` (Claude) or `ai/summary-g.md` (Gemini) with session details

4. **Always merge** both AI summaries into unified `ai/summary.md` for next session start (even if only one AI was active this session)

5. **Commit and push to git** - Backup session work to remote (Claude Code only):
   - Stage all changes with `git add -A`
   - Commit with descriptive message including what was accomplished
   - Push to remote with `git push origin master`

**Note:** This full workflow is for Claude Code. Gemini has a simplified workflow where they only update `summary-g.md` at session end and do NOT generate reports or push to git automatically.

### Merge Summaries (Manual Sync)

**You say:** "Merge summaries" or "Sync summaries" or "Update summary.md"

**AI will follow:** `agent-files/templates/summary-merge-template.md`

**Purpose:** Manually sync summaries without creating report or pushing to git.

**Use cases:**
- Mid-session sync between Claude and Gemini
- After external changes detected
- Before switching AI clients
- Quick sync without full session end

**Default workflow:**
1. Read both `summary-c.md` and `summary-g.md`
2. Merge into unified `summary.md` (current status, logs, blockers, allowers)
3. Display confirmation with counts
4. **Does NOT** create report, commit, or push

**Customize:** Edit `agent-files/templates/summary-merge-template.md` to change merge logic.

### Cross-AI Continuity

When switching between Claude and Gemini:
1. Previous AI has already updated its summary file (`summary-c.md` or `summary-g.md`)
2. Summary Agent **always merges both** into `summary.md` (even if one AI had no activity)
3. New AI reads `summary.md` at session start and picks up where you left off
4. Both AIs contribute to the same project understanding

**Note:** If only one AI has been active, the merge still occurs. The inactive AI's summary file remains unchanged while the active AI's updates are merged into the unified summary.

---

## Summary File Contents

Each summary file tracks:

### Session Information
- Activity timestamps
- Commands executed
- Files modified
- Cross-references between related projects

### Blockers
Issues preventing progress that need resolution across sessions. Or a configuration that doesn't work with installed dependencies

### Allowers
Configurations, commands, or code that made something work successfully. These are reference points for reproducing solutions.

### Annotations
Reminders about previous solutions or configurations when recreating similar setups

### Daily Highlights
Key accomplishments and discoveries from each session

---

## Log Categories

Summaries organize information into four log types:

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

### 4. (Removed - consolidated into Blockers/Allowers)
When an issue is resolved, it transitions from **Blocker** to **Allower** with the solution documented.

---

## Agent System

The system uses specialized sub-agents that run independently using the Task tool. Each agent has its own template file defining role, personality, and workflow.

### Agent Templates Location
`agent-files/agents/` contains prompt templates for each agent:
- `report-agent.md` - Report generation
- `summary-agent.md` - Summary merging
- `context-agent.md` - Context analysis
- `index-agent.md` - Project indexing

### How Agents Work
1. **Main AI** reads workflow template (e.g., `session-end-template.md`)
2. **Template instructs** which agents to invoke via Task tool
3. **Agents run independently** with their own prompts and context
4. **Agents return results** to main AI
5. **Main AI** continues workflow with agent outputs

### Report Agent
**Role:** Friendly technical writer with sarcastic, humorous tone
**Personality:** Helpful tutor who makes technical docs fun to read
**Task:** Generate how-to style reports from session activity
**Invoked:** At session end (automatically) or on demand
**Output:** `reports/YYYY-MM-DD-report.md`
**Tone Examples:**
- "This command actually worked on the first try. No, really."
- "Here's where we configured the thing that should've been configured by default."

### Summary Agent
**Role:** Professional data synthesizer
**Personality:** Methodical, precise, organized
**Task:** Merge `summary-c.md` and `summary-g.md` into unified `summary.md`
**Invoked:** At session end (automatically) or via "Merge summaries" command
**Output:** `agent-files/ai/summary.md`

### Context Agent
**Role:** Analytical assistant for project awareness
**Personality:** Helpful, thorough, insightful
**Task:** Review project state, surface blockers/allowers, identify relevant context
**Invoked:** At session start (automatically) or via "Check context" command
**Output:** Display analysis in conversation (no file writes)

### Index Agent
**Role:** Meticulous project organizer
**Personality:** Organized librarian, methodical
**Task:** Maintain high-level project index with structure and relationships
**Invoked:** At session end (optional) or via "Update index" command
**Output:** `index.md` in project root

### Agent Invocation
Agents are invoked using Claude Code's Task tool with the `general-purpose` subagent type. The workflow templates contain specific prompts for each agent that reference their template files.

**Manual Invocation Examples:**
- "Generate a report" → Invokes Report Agent
- "Merge summaries" → Invokes Summary Agent
- "Check context" → Invokes Context Agent
- "Update index" → Invokes Index Agent

Agents analyze chat history to automatically populate outputs, reducing manual documentation burden.

## Design Principles

- Creates readable, simple, and clean documentation of work accomplished.
- **AI-agnostic format** - Use markdown with clear section headers for universal parsing
- **Lowercase convention** - All managed files use lowercase names for consistency
- **Single project focus** - One `agent-files/` directory per project repository
- **Session-based workflow** - Explicit `/start-session` and `/end-session` commands for clear boundaries
- **Retrieval-focused** - Optimize for quickly finding "where did I leave off?"
- **Git integration** - Will leverage git commits for tracking changes (to be implemented)
