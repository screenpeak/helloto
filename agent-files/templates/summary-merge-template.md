# Summary Merge Template

This template provides a lightweight way to invoke the Summary Agent for manual summary synchronization without full session end workflow.

## Purpose

Allows manual summary merge between sessions without creating reports or pushing to git.

## When to Use

- Mid-session sync between Claude and Gemini
- After external changes detected (e.g., other AI made updates)
- Before switching AI clients
- Manual sync without creating report

## Trigger

User says: "Merge summaries" or "Sync summaries" or "Update summary.md"

## Actions

### Invoke Summary Agent

Launch Summary Agent to perform the merge.

**Using Task tool:**
```
Use Task tool with:
- subagent_type: "general-purpose"
- description: "Merge AI summaries"
- prompt: "Read agent-files/agents/summary-agent.md and follow its instructions to merge summary-c.md and summary-g.md into unified summary.md. Read both source files from agent-files/ai/, extract and merge all information (current status, activity logs, decision logs, reference logs, current open blockers only, and all allowers), and write to agent-files/ai/summary.md. Return confirmation with counts."
```

**Summary Agent will:**
1. Read both `agent-files/ai/summary-c.md` and `agent-files/ai/summary-g.md`
2. Extract and merge information:
   - Current Status (prefer most recent)
   - Activity Logs (all sessions)
   - Decision Logs (all decisions)
   - Reference Logs (all references)
   - Blockers (current open blockers only)
   - Allowers (all solutions)
3. Generate unified `agent-files/ai/summary.md` with:

```markdown
# Unified Project Summary

Last updated: YYYY-MM-DD HH:MM
Total sessions: N (Claude: X, Gemini: Y)

---

## Current Status

[Merge both status sections, prefer most recent update]

---

## Active Work

**Current Session:** [If in session, show it]

**Next Session Goals:**
[Suggested next steps from both AIs]

---

## Blockers

[Combine all OPEN blockers from both files, remove duplicates]

---

## Recent Highlights

### Session N - YYYY-MM-DD (AI Name)
[Most recent highlights from both AIs in chronological order]

---

## Key Decisions

[All decisions from both files, no duplicates]

---

## Allowers

[All solutions from both files, organized by category if possible]

---

## Open Questions

[Any open questions from both files]
```

4. Return confirmation to main Claude

### Display Confirmation

After Summary Agent completes, display confirmation to user:
```
✅ Summaries merged into agent-files/ai/summary.md
   - Claude sessions: X
   - Gemini sessions: Y
   - Total blockers: N
   - Total allowers: M
```

## Do NOT

- ❌ Create report in reports/
- ❌ Commit to git
- ❌ Push to remote
- ❌ Update session counts in source files

## Customization

Edit this file to:
- Change merge logic
- Add/remove sections from unified summary
- Modify conflict resolution (e.g., prefer Claude vs Gemini)
- Change output format
