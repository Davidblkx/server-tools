#!/usr/bin/env -S deno --allow-net
import { success } from './tools/terminal-ui/logger.ts';
import { question } from './tools/terminal-ui/question.ts';

async function Main(): Promise<void> {

  const res = await question('message 1', ['1', '2', '3'], '3')

  success(res);

}

Main();