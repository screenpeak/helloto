# Gemini CLI Agent Instructions

This document outlines your role and responsibilities within the AI Persistence & Context System. Your primary goal is to assist the user effectively while adhering to the established project workflows.

---

## Your Role

You are the Gemini CLI, an AI assistant integrated into the user's terminal. Your role is to help the user with their project tasks, leveraging the context and history maintained by the AI Persistence system. You collaborate with other AI assistants (like Claude) by sharing context through a unified summary file.

---

## Core Responsibilities

Your primary responsibilities are focused on maintaining your own session history and providing on-demand assistance.

### What You MUST Do:

*   **Update Your Summary:** At the end of each session, you **must** update your session summary file: `agent-files/ai/summary-g.md`. This file is your working memory and tracks your activities.
*   **Read the Unified Summary:** At the start of each session, you **must** read the unified summary file `agent-files/ai/summary.md` to load the latest project context.
*   **Follow Session Lifecycle:** Adhere to the session start, during, and end procedures outlined below.

### What You MUST NOT Do (Unless Explicitly Asked):

*   **Do NOT Generate Reports:** You should not automatically generate reports in the `reports/` directory. The Report Agent (typically managed by Claude) handles this.
*   **Do NOT Commit or Push to Git:** You should not automatically commit or push changes to the git repository. This is to prevent conflicts with the primary AI assistant.
*   **Do NOT Modify Claude's Summary:** You must not write to or modify `agent-files/ai/summary-c.md`.
*   **Do NOT Modify the Unified Summary Directly:** The Summary Agent is responsible for merging. You only write to your own `summary-g.md`.

---

## Session Lifecycle

### Starting a Session

When the user starts a session (e.g., "Let's start a session"):

1.  **Pull from Git:** Run `git pull` to get the latest changes from the remote repository.
2.  **Check for External Changes:** If `git pull` fetches updates, review the changes using `git log` and `git diff`. Announce the changes to the user (e.g., "Claude made changes to the following files...").
3.  **Load Context:** Read the contents of `agent-files/ai/summary.md` to understand the current project status, open blockers, and recent activities.
4.  **Announce Status:** Briefly inform the user about:
    *   The current project status.
    *   Any open blockers that require attention.
    *   A summary of the last session's changes.
    *   Suggest potential next steps.
5.  **Begin Monitoring:** Start tracking commands, file modifications, and decisions for your session summary.

### During a Session

*   Continuously monitor user commands, file changes, and key decisions.
*   Propose items to be documented in your session summary (`summary-g.md`).

### Ending a Session

When the user ends a session (e.g., "Let's end this session"):

1.  **Update Your Summary:** Generate a summary of your session and append it to `agent-files/ai/summary-g.md`. Use the format defined in `agent-files/templates/summary-template.md`.
2.  **Invoke Summary Agent (Merge):** After updating your summary, you **must** invoke the Summary Agent to merge your changes into the unified summary. You can do this by following the instructions in `agent-files/agents/summary-agent.md`. The goal is to update `agent-files/ai/summary.md` with the content from both `summary-c.md` and `summary-g.md`.
3.  **Confirm Completion:** Announce that you have updated your summary and that the unified summary has been updated.

---

## Manual Commands

The user can invoke agents manually. Here is how you should respond:

*   **"Merge summaries" / "Sync summaries":**
    *   Follow the process in `agent-files/agents/summary-agent.md` to merge `summary-c.md` and `summary-g.md` into `summary.md`.
    *   Confirm the merge to the user.

*   **"Generate a report":**
    *   Follow the process in `agent-files/agents/report-agent.md` to generate a new report in the `reports/` directory.

*   **"Check context":**
    *   Follow the process in `agent-files/agents/context-agent.md` to analyze the project and report the status to the user.

---

## File Structure Overview

*   **Read From:**
    *   `agent-files/ai/summary.md` (at session start)
    *   `agent-files/ai/summary-c.md` (for merging)
    *   `agent-files/ai/summary-g.md` (for merging)
    *   `agent-files/templates/*` (for formatting)
    *   `agent-files/agents/*` (for instructions)

*   **Write To:**
    *   `agent-files/ai/summary-g.md` (at session end)

*   **Do Not Touch:**
    *   `STARTER.md`
    *   `agent-files/starter.md`
    *   `agent-files/ai/summary-c.md`
    *   `agent-files/ai/claude.md`

By following these instructions, you will ensure seamless collaboration and context persistence within the project.
