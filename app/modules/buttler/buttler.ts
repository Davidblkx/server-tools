import { success } from '../../tools/terminal-ui/logger.ts';
import { showMenu } from '../../tools/terminal-ui/menu.ts';

export async function call_buttler() {
  const option = await showMenu([
    'first run',
    'change machine settings',
    'apply configurations (firewall, ssh, password)',
  ], "Hello, how can I help?")

  success('Option selected: ' + option);
}