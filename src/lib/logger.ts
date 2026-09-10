type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel =
  process.env.NODE_ENV === "production" ? "info" : "debug";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatEntry(entry: LogEntry): string {
  const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
  const context = entry.context ? ` [${entry.context}]` : "";
  return `${prefix}${context} ${entry.message}`;
}

function createLogger(context?: string) {
  return {
    debug(message: string, data?: Record<string, unknown>) {
      if (!shouldLog("debug")) return;
      const entry: LogEntry = {
        level: "debug",
        message,
        context,
        data,
        timestamp: new Date().toISOString(),
      };
      console.debug(formatEntry(entry), data ?? "");
    },

    info(message: string, data?: Record<string, unknown>) {
      if (!shouldLog("info")) return;
      const entry: LogEntry = {
        level: "info",
        message,
        context,
        data,
        timestamp: new Date().toISOString(),
      };
      console.info(formatEntry(entry), data ?? "");
    },

    warn(message: string, data?: Record<string, unknown>) {
      if (!shouldLog("warn")) return;
      const entry: LogEntry = {
        level: "warn",
        message,
        context,
        data,
        timestamp: new Date().toISOString(),
      };
      console.warn(formatEntry(entry), data ?? "");
    },

    error(
      message: string,
      error?: unknown,
      data?: Record<string, unknown>
    ) {
      if (!shouldLog("error")) return;
      const entry: LogEntry = {
        level: "error",
        message,
        context,
        data,
        timestamp: new Date().toISOString(),
      };
      console.error(formatEntry(entry), error ?? "", data ?? "");
    },
  };
}

export { createLogger };
export type { LogLevel, LogEntry };
