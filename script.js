function sendRequest(url, handleData, type, channelName) {
  var request = new XMLHttpRequest(), key = '4tkqp56p8riaa8nvg50n1b5xjqzt1mx';
  request.open('GET', url, true);
  request.setRequestHeader("Client-ID", key);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.log(data);
      handleData(data, type, channelName);
    } else {
      // We reached our target server, but it returned an error
      console.log("error");
      var outputList = document.getElementById('output');
      var listitem = document.createElement('li'), title = document.createElement('h5'), div = document.createElement('div');
      title.appendChild(document.createTextNode('Channel ' + channelName + ' not found ;('));
      div.appendChild(document.createTextNode('The channel does not exist'));
      div.classList.add('channel-description');
      // div.innerHTML = obj.text;
      listitem.appendChild(title);
      listitem.appendChild(div);
      outputList.appendChild(listitem);
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
      console.log("error");
  };

  request.send();
}

function createListItem(obj, type, channelName) {
  var outputList = document.getElementById('output');
  function featured(obj) {
    var listitem = document.createElement('li'), title = document.createElement('h5'), div = document.createElement('div'), link = document.createElement('a');
    title.appendChild(document.createTextNode(obj.title));
    div.classList.add('channel-description');
    div.innerHTML = obj.text;
    link.appendChild(title);
    link.appendChild(div);
    link.setAttribute('href', obj.stream.channel.url);
    link.setAttribute('target', 'blank');
    listitem.appendChild(link);
    outputList.appendChild(listitem);
  }
  function specific(obj, channelName) {
    var listitem = document.createElement('li'), title = document.createElement('h5'), div = document.createElement('div'), link = document.createElement('a');
    div.classList.add('channel-description');
    // div.innerHTML = obj.text;
    link.appendChild(title);
    link.appendChild(div);
    if (obj.stream == null) {
      title.appendChild(document.createTextNode(channelName + ' is offline'));
      div.appendChild(document.createTextNode('The stream is currently offline but you might want to check back later :)'));
    } else {
      title.appendChild(document.createTextNode(obj.stream.channel.name));
      div.appendChild(document.createTextNode(obj.stream.channel.status));
      link.setAttribute('href', obj.stream.channel.url);
      link.setAttribute('target', 'blank');
    }
    listitem.appendChild(link);
    outputList.appendChild(listitem);

  }

  if (type == 'featured') {
    for (var i = 0, l = obj.featured.length; i < l; i++) {
      var v = obj.featured[i];
      featured(v);
    }
  } else if (type == 'specific') {
    specific(obj, channelName);
  }

}
function featuredChannels() {
  sendRequest('https://api.twitch.tv/kraken/streams/featured', createListItem, 'featured');
}
function specificChannels(streamNames) {
  streamNames.forEach(function(stream) {
    sendRequest('https://api.twitch.tv/kraken/streams/' + stream, createListItem, "specific", stream);
  });
}

document.getElementById('featured').addEventListener('click', function(event) {
  document.getElementById('output').innerHTML = null;
  featuredChannels();
});
document.getElementById('regular').addEventListener('click', function(event) {
  document.getElementById('output').innerHTML = null;
  var streamNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  specificChannels(streamNames);
});
