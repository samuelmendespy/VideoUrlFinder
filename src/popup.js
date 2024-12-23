function createPlayerButton() {
  const playerButton = document.createElement('button');
  const playIcon = document.createElement('img');
  playIcon.src = chrome.runtime.getURL('icons/play.png');
  playIcon.alt = 'Open Video Player';
  playIcon.style.width = '20px';
  playIcon.style.height = '20px';
  playerButton.appendChild(playIcon);

  return playerButton;
}


function createCopyLinkButton(targetLink) {
  const copyLinkButton = document.createElement('button');
  const copyIcon = document.createElement('img');
  copyIcon.src = chrome.runtime.getURL('icons/button.png');
  copyIcon.alt = 'Copy Link';
  copyIcon.style.width = '20px';
  copyIcon.style.height = '20px';
  copyLinkButton.appendChild(copyIcon);

  copyLinkButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.value = targetLink;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    copyIcon.src = chrome.runtime.getURL('icons/button-pressed.png');
    
    setTimeout(() => {
      copyIcon.src = chrome.runtime.getURL('icons/button.png');
    }, 2000);
  });

  return copyLinkButton;
}

function clearStorage() {
  chrome.storage.local.set({ videoUrls: [], aulasTextos: [] }, () => {
    const listElement = document.getElementById('onclickList');
    listElement.innerHTML = '<li>No video URL was found.</li>';
  });
}

chrome.storage.local.get(['videoUrls', 'aulasTextos'], (data) => {
  const listElement = document.getElementById('onclickList');
  const videoPlayers = data.videoUrls || [];
  const headers = data.aulasTextos || [];
  

  if (videoPlayers.length === 0) {
    listElement.innerHTML = '<li>No video URL was found.</li>';
  } else {
    videoPlayers.forEach((url, index) => {
     
      const videoPlayerUrl = url.replace('?autoplay=1', '');
	  
      const li = document.createElement('li');

      const videoHeader = document.createElement('a');
      
      
      if (headers.length === 0) {
          videoHeader.innerHTML = `Video ${index}`;
      } else {
          videoHeader.innerHTML = headers[index];
      }
      
      const playerButton = createPlayerButton();
      
      videoHeader.appendChild(playerButton);
      videoHeader.href = videoPlayerUrl;
      videoHeader.target = "_blank";
      
      
      const copyLinkButton = createCopyLinkButton(videoPlayerUrl);
      
      li.appendChild(videoHeader);
      li.appendChild(copyLinkButton);

      listElement.appendChild(li);
    });
  }
  
  const clearButton = document.getElementById('clear');
    
    clearButton.addEventListener('click', clearStorage);
  
});