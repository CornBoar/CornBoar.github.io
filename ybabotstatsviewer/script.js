function onButtonClick() {
  document.getElementById('prompt').innerHTML = 'Loading...';
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/username/${document.getElementById('box').value}/`).then((Response) => {
          return Response.json()
      }).then((data) => {
          console.log(data[document.getElementById('box').value]);
          document.getElementById('prompt').innerHTML = data[document.getElementById('box').value];
      })
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/stands/${document.getElementById('box').value}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
            document.getElementById('equipped').innerHTML = `Equipped: ${data['equipped']}`;
            document.getElementById('slot_1').innerHTML = `Slot 1: ${data['slot_1']}`;
            document.getElementById('slot_2').innerHTML = `Slot 2: ${data['slot_2']}`;
            document.getElementById('slot_3').innerHTML = `Slot 3: ${data['slot_3']}`;
            document.getElementById('slot_4').innerHTML = `Slot 4: ${data['slot_4']}`;
            document.getElementById('slot_5').innerHTML = `Slot 5: ${data['slot_5']}`;
        })
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/items/${document.getElementById('box').value}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
            document.getElementById('arrows').innerHTML = `Mysterious Arrow: ${data['Mysterious Arrow']}`;
            document.getElementById('rokas').innerHTML = `Rokakaka: ${data['Rokakaka']}`;
            document.getElementById('ribs').innerHTML = `Rib Cage of the Saint's Corpse: ${data["Rib Cage of the Saint's Corpse"]}`;
            document.getElementById('luckies').innerHTML = `Lucky Arrow: ${data['Lucky Arrow']}`;
        })
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/pity/${document.getElementById('box').value}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
            document.getElementById('pity').innerHTML = `${data[document.getElementById('box').value]}%`;
        })
  fetch(`https://user5e8e13639aafd2a.app.vtxhub.com/is_admin/${document.getElementById('box').value}/`).then((Response) => {
            return Response.json()
        }).then((data) => {
              let adminStatus = data[document.getElementById('box').value];
              document.getElementById('prompt').innerHTML += adminStatus ? ' (Admin)' : '';
            });
        }
