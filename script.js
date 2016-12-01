function sendRequest(url) {
  var request = new XMLHttpRequest(), key = '4tkqp56p8riaa8nvg50n1b5xjqzt1mx';
  request.open('GET', url, true);
  request.setRequestHeader("Client-ID", key);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.log(data);
      createList(data);
    } else {
      // We reached our target server, but it returned an error
      console.log("error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
      console.log("error");
  };

  request.send();
}

function createList(arr) {
  var outputList = document.getElementById('output'), arr = arr.featured;
  for (var i = 0, l = arr.length; i < l; i++) {
    var current = arr[i];
    var listitem = document.createElement('li'), title = document.createElement('h5'), div = document.createElement('div'), link = document.createElement('a');
    title.appendChild(document.createTextNode(current.title));
    div.classList.add('channel-description');
    div.innerHTML = current.text;
    link.appendChild(title);
    link.appendChild(div);
    link.setAttribute('href', current.stream.channel.url);
    link.setAttribute('target', 'blank');
    listitem.appendChild(link);
    outputList.appendChild(listitem);
  }
}
function featuredChannels() {
  sendRequest('https://api.twitch.tv/kraken/streams/featured');
}
// function specificChannels() {
//   sendRequest('https://api.twitch.tv/kraken/streams/freecodecamp');
// }
// specificChannels();
