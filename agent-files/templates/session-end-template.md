# Session End Template

This template defines the workflow when a user ends a session.

## Trigger

User says: "Let's end this session" or "End session and document" or "Wrap up this session"

## Workflow

### Step 1: Ask User for Report Format
Present report detail level options to user:

```
How detailed should the how-to report be?

1. **Every command** - All commands in sequence (copy-paste script style)
2. **Key actions** - Important steps with context (skip trivial file operations)
3. **Recipe style** - Prerequisites + high-level steps + key commands only

Choose: [1/2/3]
```

Wait for user's choice before proceeding.

### Step 2: Invoke Report Agent
Launch Report Agent to generate how-to style report from session activity.

**Using Task tool:**
```
Use Task tool with:
- subagent_type: "general-purpose"
- description: "Generate session report"
- prompt: "Read agent-files/agents/report-agent.md and follow its instructions to generate a how-to style session report. User chose detail level: [user's choice from Step 1]. Analyze the conversation history to identify what was accomplished, commands executed, decisions made, blockers encountered, and solutions discovered. Create a report in reports/YYYY-MM-DD-HH-MM-report.md (use current timestamp in 24-hour format) following the Report Agent's format with sarcastic, humorous tone while remaining genuinely helpful."
```

**Report Agent will:**
- Analyze session conversation history
- Identify key accomplishments, commands, decisions
- Structure as how-to guide (friendly tutor with sarcastic humor)
- Apply user's chosen detail level
- Write to `reports/YYYY-MM-DD-HH-MM-report.md` (timestamped)
- Return confirmation to main Claude

### Step 3: Update AI-Specific Summary
Update this AI's summary file with session details.

**If Claude:** Update `agent-files/ai/summary-c.md`
**If Gemini:** Update `agent-files/ai/summary-g.md`

Add to summary:
- Session date and timestamp
- Activity logs (commands, files, actions)
- Decision logs (architectural choices, rationale)
- Reference logs (links, documentation, resources)
- New blockers (if any)
- New allowers (solutions that worked)
- Session highlights

Use format from `agent-files/templates/summary-template.md`.

### Step 4: Invoke Summary Agent
Launch Summary Agent to merge both AI summaries into unified summary.

**Using Task tool:**
```
Use Task tool with:
- subagent_type: "general-purpose"
- description: "Merge AI summaries"
- prompt: "Read agent-files/agents/summary-agent.md and follow its instructions to merge summary-c.md and summary-g.md into unified summary.md. Read both source files, extract and merge all information (current status, logs, blockers, allowers), and write to agent-files/ai/summary.md. Return confirmation with counts."
```

**Summary Agent will:**
- Read `summary-c.md` and `summary-g.md`
- Merge all information (status, logs, blockers, allowers)
- Write unified `summary.md`
- Return confirmation with session/blocker/allower counts

### Step 5: Invoke Index Agent (Optional)
Launch Index Agent to update project index.

**Using Task tool:**
```
Use Task tool with:
- subagent_type: "general-purpose"
- description: "Update project index"
- prompt: "Read agent-files/agents/index-agent.md and follow its instructions to update or create index.md in the project root. Scan file structure, read summary.md for project status, and generate comprehensive project index."
```

**Index Agent will:**
- Update `index.md` with current project state
- Refresh session counts and statistics
- Add recent activity to timeline
- Return confirmation

### Step 6: Git Commit & Push
Commit all session changes and push to remote repository.

```bash
git add -A
git commit -m "Session YYYY-MM-DD: [brief summary of what was accomplished]

- [Key accomplishment 1]
- [Key accomplishment 2]
- [Key accomplishment 3]

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin master
```

### Step 7: Session End Confirmation
Display final confirmation to user:

```
✅ Session ended - [YYYY-MM-DD HH:MM]

📄 Report: reports/YYYY-MM-DD-HH-MM-report.md
📊 Summary updated: agent-files/ai/summary.md
📇 Index updated: index.md
🔄 Changes pushed to git

Session Summary:
- Duration: [HH:MM]
- Commands executed: [N]
- Files modified: [N]
- Blockers encountered: [N]
- Solutions discovered: [N]

Great work! Context saved for next session.
```

## Notes

**Report Naming:** Reports include timestamp (HH-MM) to allow multiple sessions per day without overwriting.

**AI Responsibilities:**
- **Claude Code**: Full workflow (report generation, summary merge, index update, git push)
- **Gemini**: Simplified workflow (only updates summary-g.md) - see gemini.md for details

## Customization

Edit this file to:
- Change report format options
- Modify agent invocation parameters
- Skip index update (remove Step 5)
- Change git commit message format
- Add project-specific cleanup steps
- Modify confirmation message

## Important Notes

- **Report Agent** generates how-to guide with personality (sarcastic, humorous tutor)
- **Summary Agent** merges both AI summaries (even if only one was active)
- **Index Agent** is optional but recommended for project overview
- **Git push** backs up all work to remote for cross-AI continuity
- All agents run independently and return results to main Claude
