// run tests for app
import { glob } from 'https://deno.land/std/fs/glob.ts';
import { walk } from 'https://deno.land/std/fs/walk.ts';

import * as logger from './tools/terminal-ui/logger.ts';

async function runTests() {
  const root_path = Deno.args[0].replace('tests.ts', '');
  const path_glob = glob(root_path + '**/*.spec.ts');
  
  logger.info('Looking for test files as `./**/*.spec.ts`');  
  const test_files = await grabTests(path_glob);
  logger.info(`Found ${test_files.length} tests!`)
  
  const test_results: { [key: string]: [boolean, string] } = {};
  for (const f of test_files) {
    logger.info('\nRunning tests for: ' + f);
    const result = await runTestFile(f);
    printResult(result);
    test_results[f] = result;
  }

  printResume(test_results);
}

async function grabTests(glob: RegExp): Promise<string[]> {
  const test_files: string[] = [];

  const walkData = walk(Deno.cwd(), { match: [glob] });
  for await (const w of walkData) {
    test_files.push(w.filename);
  }

  return test_files;
}

async function runTestFile(file: string): Promise<[boolean, string]> {
  try { 
    const module = await import(file);
    if (typeof module['test'] !== 'function') { return [false, 'Error: `test()` not found'] }
    try {
      const res = await module['test']();
      if (Array.isArray(res)) { return <any>res }
      
      return [false, 'Error: tests results not valid']

    } catch (e) {
      if (Array.isArray(e)) { return <any>e }
      return [false, 'Error: exception on running tests']
    }
  }
  catch { return [false, 'Error: loading module']; }
  
}

function printResult(r: [boolean, string]) {
  if (r[0]) {
    logger.success('Tests passed!')
  } else {
    const messgae = 'Tests failed: ' + r[1];
    logger.error(messgae);
  }
}

function printResume(l: {[key: string]: [boolean, string]}) {
  const hasFailTest = Object.values(l).filter(e => e[0] === false).length;
  if (hasFailTest)
    logger.warning('\nSome tests have failed!')
  else
    logger.success('\nAll tests passed!')

  for (const [key, value] of Object.entries(l)) {
    if (value[0]) {
      logger.success('Tests passed: ' + key);
    } else {
      logger.error('Tests fail: ' + key);
    }
  }
}

runTests();