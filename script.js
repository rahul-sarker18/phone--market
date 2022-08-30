const list =(search,toinone)=>{   
    fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then(res => res.json())
    .then(data =>dataOne(data.data ,toinone))
}

const dataOne =(data ,toinone)=>{
   
    const mainDive =document.getElementById('main-div')
    mainDive.innerHTML =``;
    // new lines 
    //  data =data.slice(0,10);
    const showall=document.getElementById('show-all');
    // console.log(data)
    if(toinone && data.length>10){
        data =data.slice(0,10);
        showall.classList.remove('d-none');
    }else{
        showall.classList.add('d-none')
    }

    //  error messagech 
    const errorM =document.getElementById('eroor')
    if(data.length ===0){
        errorM.classList.remove('d-none')
    }else{
        errorM.classList.add('d-none')
    }
    // error messagech 


    data.forEach(array => {
        const newDiv =document.createElement('div');
        newDiv.classList.add('col');

        newDiv.innerHTML=`
        <div class="card">
               <img src="${array.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
            <h5 class="card-title text-info">${array.brand}</h5>
            <h5 class="card-title ">${array.phone_name}</h5>
            <button onclick="dbtn('${array.slug}')" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">click me </button>          
            </div>
      </div>
        `
        mainDive.appendChild(newDiv);
        console.log(array)
    });
    typeSpinner(false);
}
// showall btn part -2 and search btn in proces             problem
const processSearch =(toinone)=>{
    typeSpinner(true);
    const searchInput =document.getElementById('search')
    const searchValue =searchInput.value;
    list(searchValue, toinone);
    // searchInput.value ='';
}


// search btn and input 
const clickSearsh =()=>{
   processSearch(10);
}
// js input fild enter key event hendelar add 
document.getElementById('search').addEventListener('keypress', function(e){
    if(e.key ==='Enter'){
        processSearch(10);
    }
})

// spinner add 
const typeSpinner =(isTrue)=>{
    const spn =document.getElementById('spinner');
    if(isTrue){
        spn.classList.remove('d-none');
    }else{
        spn.classList.add('d-none');
    }
}

// showall btn works 
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

//  div btn working srard 
const dbtn=(id)=>{
    // console.log(5415)
    const urll =`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(urll)
    .then(res=>res.json())
    .then(dataAll => displyBtnDteals(dataAll.data))
}
const displyBtnDteals =detalse=>{
    console.log(detalse)
    const header =document.getElementById('staticBackdropLabel');
    header.innerText=detalse.brand;
    const phoneName =document.getElementById('phone-name');
    phoneName.innerText =detalse.name;
    const phoneStorage =document.getElementById('phone-storage');
    phoneStorage.innerText =detalse.mainFeatures.memory;
    const displaySizes =document.getElementById('disply-size');
    displaySizes.innerText =detalse.mainFeatures.displaySize;
}
