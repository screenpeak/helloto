# Session Start Template

This template defines the workflow when a user starts a new session.

## Trigger

User says: "Let's start a session" or "Start a session" or "Begin session"

## Workflow

### Step 1: Git Pull
Pull latest changes from remote repository to sync with external updates (e.g., changes from other AI clients).

```bash
git pull
```

### Step 2: Check for External Changes
If git pull brought updates:
1. Review what changed:
```bash
git log -1
git diff HEAD~1
```
2. Announce to user: "External changes detected: [brief summary of what was updated]"
3. These changes will be loaded by Context Agent in next step

### Step 3: Invoke Context Agent
Launch Context Agent to analyze project state and load context from previous sessions.

**Using Task tool:**
```
Use Task tool with:
- subagent_type: "general-purpose"
- description: "Analyze project context"
- prompt: "Read agent-files/agents/context-agent.md and follow its instructions to provide context analysis for session start. Read agent-files/ai/summary.md and provide current project status, open blockers, available solutions, and suggested next steps."
```

**Context Agent will:**
- Read `agent-files/ai/summary.md`
- Surface open blockers
- List available allowers (solutions)
- Highlight recent changes (including external changes from git pull)
- Suggest next steps
- Display analysis to user

### Step 4: Announce Session Start
After Context Agent returns its analysis, confirm session has started:

```
✅ Session started - [YYYY-MM-DD HH:MM]
📊 Context loaded from previous sessions
🎯 Ready to begin work

[Display Context Agent's analysis]

Monitoring session activity for end-of-session report.
```

### Step 5: Begin Monitoring
Track all activity during the session for later report generation:
- Commands executed
- Files modified
- Decisions made
- Configurations changed
- Problems encountered
- Solutions discovered
- Resources referenced

## Customization

Edit this file to:
- Change git workflow (branch handling, merge vs rebase, etc.)
- Modify Context Agent invocation
- Add additional pre-session checks
- Change announcement format
- Add project-specific initialization steps
