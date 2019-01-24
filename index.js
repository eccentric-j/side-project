const _ = require("highland");
const R = require("ramda");
const { exec, spawn } = require("child_process");

function execCmd ([cmd, ...args]) {
  return spawn(cmd, args, {
    stdio: 'inherit',
    // timeout: 3000,
  });
}

function killCmd (child) {
  const output = _('exit', child).take(1);

  // child.stdin.pause();
  child.kill("SIGKILL");
  // child.disconnect();

  return output;
}

function delay (ms) {
  return data => _(push => setTimeout(() => {
    push(null, data);
    push(null, _.nil);
  }, ms));
}

// _.of(["tmux", "new"])
// _.of(["less", "index.js"])
_(process.stdin)
  .split()
  .filter(Boolean)
  .map(R.split(" "))
  .map(execCmd)
  // .flatMap(child => _(push => setTimeout(push, 3000, child)))
  .flatMap(delay(3000))
  // .each(killCmd)
  .flatMap(killCmd)
  .each(() => {
    execCmd(["git", "add", "-i"]);
  });
