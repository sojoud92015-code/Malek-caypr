document.addEventListener('DOMContentLoaded', () => {
  // Terminal output and input
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const typeSound = document.getElementById('type-sound');

  // Widgets
  const clock = document.getElementById('clock');
  const os = document.getElementById('os');
  const user = document.getElementById('user');
  const net = document.getElementById('net');
  const date = document.getElementById('date');

  // Sound effect for typing
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key.length === 1 || e.key === 'Backspace') {
      typeSound.currentTime = 0;
      typeSound.play();
    }
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  // Terminal command handler
  function handleCommand(cmd) {
    if (!cmd.trim()) return;
    let response = '';
    switch(cmd.toLowerCase()) {
      case 'help':
        response = 'Commands: [help, about, time, clear, trend, os, user, net]';
        break;
      case 'about':
        response = 'eDEX-UI Clone | Cyberpunk Terminal UI | Trend Maker 😎';
        break;
      case 'time':
        response = `Current time: ${new Date().toLocaleTimeString()}`;
        break;
      case 'clear':
        terminalOutput.textContent = '';
        return;
      case 'trend':
        response = '🔥 This UI is going viral... #TRENDING';
        break;
      case 'os':
        response = 'OS: ' + navigator.platform;
        break;
      case 'user':
        response = 'User: ' + (navigator.userAgentData ? navigator.userAgentData.platform : 'Anonymous');
        break;
      case 'net':
        response = 'Network: ' + (navigator.onLine ? 'Online' : 'Offline');
        break;
      default:
        response = 'Unknown command! Type "help"';
    }
    terminalOutput.textContent += '\n> ' + cmd + '\n' + response;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Clock widget
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
    date.textContent = now.toLocaleString();
  }, 1000);

  // OS/User widget
  os.textContent = navigator.platform;
  user.textContent = (navigator.userAgentData ? navigator.userAgentData.platform : 'Guest');

  // Network widget
  function updateNet() {
    net.textContent = navigator.onLine ? 'Online' : 'Offline';
  }
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  updateNet();
});
