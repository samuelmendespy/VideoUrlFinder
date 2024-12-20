chrome.storage.local.get(['videoUrls', 'aulasTextos'], (data) => {
  const listElement = document.getElementById('onclickList');
  const videoUrls = data.videoUrls || [];
  const aulasTextos = data.aulasTextos || [];
  

  if (videoUrls.length === 0) {
    listElement.innerHTML = '<li>No video URL was found.</li>';
  } else {
    videoUrls.forEach((url, index) => {
     
      const cleanedUrl = url.replace('?autoplay=1', '');
	  
      const aulaTextoAtual = `Aula 0.0`;

      const li = document.createElement('li');

      const link = document.createElement('a');
      link.href = cleanedUrl;
	  link.target = "_blank";
      if (aulasTextos.length === 0) {
          link.innerHTML = `${aulaTextoAtual}`;
      } else {
          link.innerHTML = aulasTextos[index];
      }
      
      const btnPlayVideo = document.createElement('button');
      
      const playIcon = document.createElement('img');
      playIcon.src = chrome.runtime.getURL('icons/play.png')
      playIcon.alt = 'Play video';
      playIcon.style.width = '20px';
      playIcon.style.height = '20px';
      
      btnPlayVideo.appendChild(playIcon);
      
      btnPlayVideo.addEventListener('click', () => {
          window.open(cleanedUrl, '_blank');
      });
      
      
      
      const btnCopyLink = document.createElement('button');
      
      const copyIcon = document.createElement('img');
      copyIcon.src = chrome.runtime.getURL('icons/button.png');
      copyIcon.alt = 'Copy Link';
      copyIcon.style.width = '20px';
      copyIcon.style.height = '20px';
      
      btnCopyLink.appendChild(copyIcon);
      
      
      btnCopyLink.addEventListener('click', () => {
        const input = document.createElement('input');
        input.value = cleanedUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

        copyIcon.src = chrome.runtime.getURL('icons/button-pressed.png');
        
        setTimeout(() => {
          copyIcon.src = chrome.runtime.getURL('icons/button.png');
        }, 2000);
      });
      
      
      li.appendChild(link);
      li.appendChild(btnPlayVideo);
      li.appendChild(btnCopyLink);

      listElement.appendChild(li);
    });
  }
  
  
    const clearButton = document.getElementById('clear');
    
    clearButton.addEventListener('click', () => {
        
    chrome.storage.local.set({ videoUrls: [], aulasTextos: [] }, () => {
      listElement.innerHTML = '<li>No video URL was found.</li>';
    });
  });
  
});