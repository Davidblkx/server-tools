#!/usr/bin/env -S deno --allow-net
import { call_buttler } from './modules/buttler/buttler.ts';
import { error } from './tools/terminal-ui/logger.ts';

async function Main(): Promise<void> {

  if (Deno.args.length > 1) {
    console.log(Deno.args)
    error('Argument input not implemented')
    return;
  }

  await call_buttler();

}

Main();