function showClock() {
  setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();

    // Clear the line and move cursor back to start
    process.stdout.write('\r' + time);
  }, 1000);
}

showClock();
