/// <reference types="node" />
import { SpawnOptionsWithoutStdio } from 'child_process';
/**
 * Run command with text output in terminal
 */
export declare const runCommand: (command: string, options?: SpawnOptionsWithoutStdio | undefined) => Promise<string>;
