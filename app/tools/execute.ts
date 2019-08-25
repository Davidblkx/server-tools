export async function bashExecute(command: string): Promise<string> {
  const shell = Deno.env()['SHELL'] || '/bin/sh';
  const process = Deno.run({
    args: [shell, '-c', command],
    stdout: 'piped',
  });
  const outputBytes = await process.output();
  return new TextDecoder('UTF-8').decode(outputBytes);
}