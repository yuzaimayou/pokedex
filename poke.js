
var api_next='https://pokeapi.co/api/v2/pokemon?limit=20/'
var list2 = document.getElementById('list')
var n = document.getElementsByClassName('card')
function refesh(){
    console.log('refesh')
    document.querySelector('#list').remove()
    var create_list =document.createElement('div')
    create_list.id="list"
    document.querySelector('#list-searchbox').appendChild(create_list)
    
}

function load_card(url){
    fetch(url)
        .then(res=>res.json())
        .then(details=>{
            var card = document.createElement('div')
            card.className='card'
            console.log('loading2')
            card.innerHTML=`
                <img src="${details.sprites.front_default}">
                <p>${details.id}. ${details.name}</p>`
            document.querySelector('#list').appendChild(card)
        })
    
    
}

function load_api(api){
    fetch(api)
        .then(res=>res.json())
        .then(data=>{
            console.log('loadingg')
            data.results.map(function(results){
                load_card(results.url)
            })
        })
}

function searching(input){
    console.log(`hien thi ket qua cua ${input}`)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1024/')
        .then (res=>res.json())
        .then (data=>{
           data.results.map(function(results){                           
                if(results.name.includes(input)){
                    console.log(`${input} nằm trong ${results.name}`)
                    load_card(results.url)
                }
            }
        )
        })
}


load_api('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
document.addEventListener('DOMContentLoaded',function(){
    let input = document.querySelector('#search')
    let input2=document.querySelector('#list')  
    input.addEventListener('keyup',function(event){
        if (input.value){
            if(input.value!=value2){
                clearTimeout(timeOutId)
                var value2=input.value
                var timeOutId= setTimeout(()=>{
                    refesh()
                    searching(input.value)
                }, 1000)
                }
                       
            
        }
        else{
            clearTimeout(timeOutId)
            console.log(`input cũ: ${value2}`)
            refesh()
            load_api('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
            // input2.addEventListener('scroll', function(){
            //     if(input2.offsetHeight+input2.scrollTop >= input2.scrollHeight-100){
            //         setTimeout(load(api_next),500)      
            //     }
            // })                        
        }

    })
})


function load(api) {
    fetch(api)
        .then(response => response.json())
        .then(function(data){
            api_next = `${data.next}`
            data.results.forEach(async (data) => {
                const url=data.url
                const res= await fetch(`${url}`)
                const detail = await res.json()
                    
                        console.log(detail.id)
                        var card= document.createElement('div')
                        card.className = 'card'
                        card.innerHTML =`
                            <img src="${detail.sprites.front_default}">
                            <div class="details">
                                <p id="name">${detail.id}.${detail.name}</p>
                            </div>
                        `
                        document.getElementById('list').appendChild(card)
                    
                
            });

        })
    
}


