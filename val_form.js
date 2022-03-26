//- Țară - să aveți 3 țări
//- Oraș - se vor schimba în dependență de țara aleasă (3-5 valori pentru fiecare țară e suficient)

let tari = document.getElementById('country');
let oraseDinSelect = document.getElementById('orase');

tari.addEventListener('change' , function (){  

    let toateOrasele = [
      ['London' , 'Manchester' , 'Bristol'],
      ['Alba-Iulia' , 'Piatra-Neamț' , 'Oradea'],
      ['Berlin' , 'Frankfurt' , 'Stuttgart']
    ];

    
    let l = oraseDinSelect.options.length - 1;

    while( oraseDinSelect.options.length > 1 ){
      oraseDinSelect.options.remove(l);
      l--;
    }

    if(tari.options.selectedIndex > 0){ //daca nu este selectata optiunea 'Alege...'

      for( oras of toateOrasele[tari.options.selectedIndex - 1] ){ 
        /*index-ul selectat(al optiunii)(a catea tara minus 1) al select-ului cu 1 mai mare
        decat index-ul array-ului de orase(din toateOrasele) ale acelei tari selectate(vezi html)*/
        let optiuneOras = document.createElement('option');
        optiuneOras.text = oras;
        oraseDinSelect.options.add(optiuneOras);
      }

      //daca user-ul se decide sa schimbe tara, orasul se reseteaza si trebuie alertat (toate acestea dupa primul submit)
      if(liveValidation){
        if( oraseDinSelect.options.selectedIndex === 0 ){
          schimbaInRosu(oraseDinSelect);
        }else{
          schimbaInVerde(oraseDinSelect);
        }
      }
    }
  }
);

// VALIDARE
let valid , liveValidation = false;

const form = document.querySelector('.main-form'),
      nume = document.querySelector('#firstName'),
      prenume = document.querySelector('#lastName'),
      username = document.querySelector('#username'),
      email = document.querySelector('#email'),
      adresa = document.querySelector('#address'),
      adresa2 = document.querySelector('#address2'),
      zip = document.querySelector('#zip'),
      buton = document.querySelector('.btn btn-primary btn-lg btn-block')
;

function schimbaInVerde(sectiune){
  if( sectiune.classList.contains('is-invalid') )sectiune.classList.remove('is-invalid'); //prima data se sterge is-invalid daca exista
  sectiune.classList.add('is-valid'); //apoi se adauga is-valid daca nu exista
}

function schimbaInRosu(sectiune){
  if( sectiune.classList.contains('is-valid') )sectiune.classList.remove('is-valid'); //prima data se sterge is-valid daca exista
  sectiune.classList.add('is-invalid'); //se adauga is-invalid daca nu exista
  valid = false;
}

function verif_nume_sau_prenume(alegere){ //numele si prenumele trb sa aiba doar litere, maxim 30, prima litera o vom schimba in litera mare daca trebuie
  let regexp = /^[a-zA-Z]+$/;
  if( regexp.test(alegere.value) && alegere.value.length <= 30 ){
    alegere.value = alegere.value.substr(0,1).toUpperCase() + alegere.value.substr(1).toLowerCase();
    return 1;
  }
  else return 0;
}

function verif_username(){ //verif daca are caractere albe
  let regexp = /^[a-zA-Z0-9]+$/;
  return( regexp.test(username.value) && username.value.length <= 20 );
  
}

function verif_email() {
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (re.test(email.value) || email.value === '');
}

function valideazaTot(){
  valid = true; //se va schimba in fals daca cel putin o sectiune nu este valida
  //nume si prenume
  if( !verif_nume_sau_prenume(nume) ){   
    schimbaInRosu(nume); 
  }else{    
    schimbaInVerde(nume);
  }

  if( !verif_nume_sau_prenume(prenume) ){   
    schimbaInRosu(prenume);
  }else{    
    schimbaInVerde(prenume);
  } 

  //username
  if( !verif_username() ){
    schimbaInRosu(username);
  }else{
    schimbaInVerde(username);
  }

  //email
  if( !verif_email() ){
    schimbaInRosu(email); 
  }else{
    schimbaInVerde(email);
  }

  //adresa
  if( adresa.value === '' ){
    schimbaInRosu(adresa); 
  }else{
    schimbaInVerde(adresa);
  }

  //adresa2
  schimbaInVerde(adresa2);

  //tara si orasul
  if( tari.options.selectedIndex === 0 ){
    schimbaInRosu(tari);
    schimbaInRosu(oraseDinSelect);     
  }else{
    schimbaInVerde(tari);
    if( oraseDinSelect.options.selectedIndex === 0 ){
      schimbaInRosu(oraseDinSelect);
    }else{
      schimbaInVerde(oraseDinSelect);
    }
  }
  
  //cod postal
  if( !isNaN(zip.value) && zip.value.length === 6 ){
    schimbaInVerde(zip);
  }else{
    schimbaInRosu(zip);
  }
}

function displayLiveValidation(){
  form.addEventListener('input' , function(){
    if( liveValidation ){ //validarea in timp real se va afisa doar dupa ce se da prima data submit
      valideazaTot();
    }
  });
}

displayLiveValidation();

form.addEventListener('submit' , function(event){

  if(liveValidation === false){ 
    liveValidation = true;
    valideazaTot();
  }

  if( valid === false){
    event.preventDefault();
    event.stopPropagation();
  }else{ //daca totul este valid, vom trimite mai departe datele prin local storage
    window.localStorage.setItem('submitted' , '1');//pagina caruia plasam datele se va folosi de asta
    
    window.localStorage.setItem('nume' , nume.value);
    window.localStorage.setItem('prenume' , prenume.value);
    window.localStorage.setItem('username' , username.value);
    if(email.value !== '')window.localStorage.setItem('email' , email.value);
    else window.localStorage.removeItem('email');
    window.localStorage.setItem('adresa1' , adresa.value);
    if(adresa2.value !== '')window.localStorage.setItem('adresa2' , adresa2.value);
    else window.localStorage.removeItem('adresa2');
    window.localStorage.setItem('tara' , tari.options[ tari.options.selectedIndex ].value );
    window.localStorage.setItem('oras' , oraseDinSelect.options[ oraseDinSelect.options.selectedIndex ].value );
    window.localStorage.setItem('cod_postal' , zip.value);
  }

});

