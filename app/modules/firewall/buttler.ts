import { bashExecute } from '../../tools/execute.ts';
import { error, warning } from '../../tools/terminal-ui/logger.ts';
import { showEnumMenu } from '../../tools/terminal-ui/menu.ts';
import { question } from '../../tools/terminal-ui/question.ts';

export async function call_buttler_firewall() {
  let breakCycle = false;
  while (!breakCycle) {
    const option = await showEnumMenu(
      FirewallButtler,
      "Firewall actions: ",
      FirewallButtler.openPort,
    );

    switch (option) {
      case FirewallButtler.exit: {
        Deno.exit(1);
        break;
      }
      case FirewallButtler.back: {
        breakCycle = true;
        break;
      };
      case FirewallButtler.openPort: {
        await open_port();
        break;
      }
      default: warning('There are no handler for selected option\n');
    }

  }
}

async function open_port() {
  let portNumber: string = '';

  do{
    portNumber = await question('What port to open?', ['8080', '5000:5080'], '', 'warning');
    if (portNumber.indexOf(':') === -1) {
      if (!Number.isNaN(+portNumber)) break;
    } else {
      const values = portNumber.split(':').map(e => Number.isNaN(Number(e)));
      if (values.length === 2 && !values[0] && ! values[1]) break
    }
    error(`${portNumber} is not a valid port number or port range`);
  } while(true)

  const manager = await askFirewallManager();
  const protocol = await showEnumMenu(
    Protocol,
    'What handler to user?',
    Protocol.tcp,
    'warning'
  );

  const prt = Protocol[protocol];
  const cmd =  manager === FirewallManager.iptables ?
    `iptables -A INPUT -p ${prt} –dport ${portNumber} -j ACCEPT`
    : `firewall-cmd --add-port=${portNumber.replace(':', '-')}/${prt} --permanent`
  const res = await bashExecute(cmd);
  console.log(res);
}

async function askFirewallManager(): Promise<FirewallManager> {
  return showEnumMenu(
    FirewallManager,
    'What handler to user?',
    FirewallManager.iptables,
    'warning'
  );
}

enum FirewallButtler {
  openPort = 0,
  closePort = 1,
  back = 98,
  exit = 99,
}

enum FirewallManager {
  iptables = 0,
  firewalld = 1,
}

enum Protocol {
  tcp = 0,
  ucp = 1,
}