function getApi(url){
  let request = new XMLHttpRequest;
  request.open('GET',url,false);
  request.send();
  return request.responseText;

}

let searchItem = document.getElementById('search-text');
searchItem.addEventListener('keypress',function(e){
  if (e.key === 'Enter'){
    searchBook();
  }
})

let pag = 1;
let index = 0;

function searchResponse(response,pagIndex =1,initialIndice = 0,maxIndice=10) {
  document.getElementById("content").innerHTML = ""
    for (var i = initialIndice; i < maxIndice; i++) {
      var item = response.items[i];
      document.getElementById("content").innerHTML += "<br>" + `<img class='livros' id="banner-livro" src="${item.volumeInfo.imageLinks.thumbnail}" alt="">`
      if(String(item.volumeInfo.title).length <30){
        document.getElementById("content").innerHTML += '<p id="p-book">'+(item.volumeInfo.title).substring(0,25)+'</p>' ;   
        if(item.volumeInfo.authors == undefined){
          document.getElementById("content").innerHTML += '<p id="p-book">Autor: Desconhecido'+'</p>';
        }else{ document.getElementById("content").innerHTML += '<p id="p-book">Autor: '+(item.volumeInfo.authors)+'</p>';}
        document.getElementById("content").innerHTML += `<a href='${item.volumeInfo.infoLink}' target='_blank'><button>Ver livro</button></a>` + '<hr></hr>';
      }else{
          document.getElementById("content").innerHTML += '<p id="p-book">'+(item.volumeInfo.title).substring(0,35) + "..."+'</p>';
          if(item.volumeInfo.authors == undefined){ document.getElementById("content").innerHTML += '<p id="p-book">Autor: Desconhecido'+'</p>';
          }else{  document.getElementById("content").innerHTML += '<p id="p-book">Autor: '+(item.volumeInfo.authors)+'</p>';}
          document.getElementById("content").innerHTML += `<a href='${item.volumeInfo.infoLink}' target='_blank'><button>Ver livro</button></a>` + '<hr></hr>';
        }  }
        let page = document.getElementById('page');
        let nextPage = document.getElementById('next-page')
        page.innerHTML = `Página ${pagIndex} de 4`;
        let backPage= document.getElementById('back-page')

        if(maxIndice<40){
        nextPage.innerHTML = '<img src="/assets/next-icon.svg" id="next" class="img-buttons" alt="">'
        nextPage.addEventListener('click',function(){
          if(maxIndice<40){
          maxIndice +=10
          initialIndice += 10;
          pagIndex++;
          nextPage.innerHTML = " ";
          backPage.innerHTML =   '<img id="back" src="/assets/back-icon.svg" class="img-buttons" alt="">'
          document.getElementById("content").innerHTML = ""
          searchResponse(response,pagIndex,initialIndice,maxIndice);}
          else{
              nextPage.innerHTML = " "  
          }}
          );
        }
        

        backPage.addEventListener('click',function(){
          if(pagIndex===2){
           initialIndice -= 10;
            maxIndice -=10
            pagIndex--;
            backPage.innerHTML=''
            page.innerHTML = `Página ${pagIndex} de 4`;
            document.getElementById("content").innerHTML = ""
            searchResponse(response,pagIndex,initialIndice,maxIndice);
          }else{
            pagIndex--;
            maxIndice -=10
            initialIndice -= 10;
            page.innerHTML = `Página ${pagIndex} de 4`;
            backPage.innerHTML =   '<img id="back" src="/assets/back-icon.svg" class="img-buttons" alt="">'
            document.getElementById("content").innerHTML = ""
            searchResponse(response,pagIndex,initialIndice,maxIndice);
          }
        })
       
        
        }
      

function searchBook(indice = 0,pagIndex){
  var palavraDigitada;
  palavraDigitada = document.getElementById('search-text').value;
  if(palavraDigitada.length > 0){  
    var response = getApi(`https://www.googleapis.com/books/v1/volumes?q=${palavraDigitada}&filter=free-ebooks&maxResults=40`);
    response = JSON.parse(response)
    console.log(response.items);
  
    searchResponse(response,pagIndex,indice);
  }else{
    document.getElementById("content").innerHTML = '<p>Digite uma palavra!</p>' 
  }
}




