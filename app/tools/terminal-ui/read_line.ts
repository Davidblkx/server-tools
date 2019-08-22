import { BufReader } from 'https://deno.land/std/io/bufio.ts';

export async function readLine(stdin: Deno.Reader = Deno.stdin) {
  const reader = BufReader.create(stdin);
  const { line } = await reader.readLine();
  if (line === Deno.EOF) { return ''; }
  return new TextDecoder('utf-8').decode(line);
}