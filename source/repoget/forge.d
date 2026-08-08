module repoget.forge;

import std.file;
import std.path;
import std.string;
import std.algorithm;
import std.regex;
import std.process;
import std.stdio;
import sdlang;

/// SDL-backed forge metadata profile (issues/PRs/discussions tooling).
struct ForgeProfile {
	string name;
	string[] matchers;
	string cli;
	string[] checkCmd;
	string[] listIssuesCmd;
	string[] listPrsCmd;
	bool graphql;
	int minIntervalMs = 1000;
	int on429BackoffS = 60;
}

private string forgeCachePath() {
	string home = environment.get("HOME", environment.get("USERPROFILE", "."));
	return buildPath(home, ".dlang-supplemental", "repo-get", "forge-profiles.sdl");
}

class ForgeProfileManager {
	private ForgeProfile[string] profiles;
	private static const string DEFAULT_SDL = import("forge-profiles.sdl");

	this() {
		loadAll();
	}

	void loadAll() {
		parseSdl(DEFAULT_SDL);
		auto cache = forgeCachePath();
		if (exists(cache)) {
			try { parseSdl(readText(cache)); } catch (Exception e) {
				writeln("Warning: Failed to parse cached forge profiles: ", e.msg);
			}
		}
	}

	private void parseSdl(string content) {
		Tag root = parseSource(content);
		foreach (tag; root.tags) {
			if (tag.name != "forge") continue;
			ForgeProfile p;
			p.name = tag.values[0].get!string;
			foreach (t; tag.tags) {
				string[] vals;
				foreach (v; t.values) vals ~= v.get!string;
				if (t.name == "matcher") p.matchers = vals;
				else if (t.name == "cli" && vals.length) p.cli = vals[0];
				else if (t.name == "check") p.checkCmd = vals;
				else if (t.name == "list-issues") p.listIssuesCmd = vals;
				else if (t.name == "list-prs") p.listPrsCmd = vals;
				else if (t.name == "graphql" && t.values.length) {
					try { p.graphql = t.values[0].get!bool; }
					catch (Exception) { p.graphql = vals.length && vals[0] == "true"; }
				} else if (t.name == "rate_limit") {
					foreach (rl; t.tags) {
						if (rl.name == "min_interval_ms" && rl.values.length)
							p.minIntervalMs = cast(int) rl.values[0].get!long;
						else if (rl.name == "on_429_backoff_s" && rl.values.length)
							p.on429BackoffS = cast(int) rl.values[0].get!long;
					}
				}
			}
			profiles[p.name] = p;
		}
	}

	/// Resolve forge profile from host or remote URL. Returns init if none.
	ForgeProfile findForge(string hostOrUrl) {
		foreach (name, profile; profiles) {
			foreach (m; profile.matchers) {
				if (!matchFirst(hostOrUrl, regex(m)).empty)
					return profile;
			}
		}
		if ("github" in profiles) return profiles["github"];
		return ForgeProfile.init;
	}

	bool isCliAvailable(ForgeProfile p) {
		if (p.checkCmd.length == 0) return true;
		try { return execute(p.checkCmd).status == 0; }
		catch (Exception) { return false; }
	}
}

private ForgeProfileManager _forgeManager;

ForgeProfileManager getForgeManager() {
	if (_forgeManager is null) _forgeManager = new ForgeProfileManager();
	return _forgeManager;
}

/// Resolve forge profile from host or remote URL.
ForgeProfile getForge(string hostOrUrl) {
	return getForgeManager().findForge(hostOrUrl);
}
