import winston from 'winston';
import path from 'path';
import fs from 'fs';
// Ensure log directory exists
const logDir = path.join(process.cwd(), 'reports', 'logs');
if (!fs.existsSync(logDir))
    fs.mkdirSync(logDir, { recursive: true });
// Define custom log levels
const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        success: 3,
        step: 4,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        success: 'green',
        step: 'magenta',
    },
};
winston.addColors(customLevels.colors);
// Create Winston logger
const Logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(winston.format.timestamp({ format: 'HH:mm:ss' }), winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)),
    transports: [
        // Console: print all logs with color
        new winston.transports.Console({
            level: 'step',
            format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: 'HH:mm:ss' }), winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)),
        }),
        // File: log everything to file for CI/reporting
        new winston.transports.File({
            filename: path.join(logDir, 'test.log'),
            level: 'step', // include all logs (step, success, info, etc.)
        }),
    ],
});
// Export helper
export const log = {
    info: (msg) => Logger.log('info', msg),
    warn: (msg) => Logger.log('warn', msg),
    error: (msg) => Logger.log('error', msg),
    success: (msg) => Logger.log('success', msg),
    step: (msg) => Logger.log('step', msg),
};
