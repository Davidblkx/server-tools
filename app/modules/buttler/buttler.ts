import { warning } from '../../tools/terminal-ui/logger.ts';
import { showEnumMenu } from '../../tools/terminal-ui/menu.ts';
import { call_buttler_firewall } from '../firewall/buttler.ts';

enum Options {
  firewall = 0,
  exit = 99,
}

export async function call_buttler() {
  let breakCycle = false;
  while (!breakCycle) {
    const option = await showEnumMenu(
      Options,
      "Hello, how can I help?",
      Options.firewall,
    );

    switch (option) {
      case Options.exit: {
        breakCycle = true;
        break;
      }
      case Options.firewall: {
        await call_buttler_firewall();
        break;
      }
      default: warning('There are no handler for selected option\n');
    }

  }
}