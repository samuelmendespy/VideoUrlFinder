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
      

      const textAfterLink = document.createElement('span');
      textAfterLink.innerHTML = `-> Copy URL`;
      
      textAfterLink.addEventListener('click', () => {
        const input = document.createElement('input');
        input.value = cleanedUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

        textAfterLink.innerHTML = "-> Link copied!";
        setTimeout(() => {
          textAfterLink.innerHTML = "-> Copy URL again";
        }, 2000);
      });

      li.appendChild(link);
      li.appendChild(textAfterLink);

      listElement.appendChild(li);
    });
  }
});
