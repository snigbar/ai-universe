"use strict";
// variable for soting out
let sorted = false;
const dataSection = document.getElementById("data-section");
const loadData = async(setLimit) => {
    // start spinner
    spinner(true);
    // fetch api
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const response = await fetch(url);
    const data = await response.json();
    // call display data
    displayData(data.data.tools, setLimit);
}

const displayData = (dataArr, limit=6) => {

    // data section
   
    dataSection.innerText ="";

    // checking sort
    if(sorted){
        
        dataArr.sort((a, b) => {
            return new Date(b.published_in) - new Date(a.published_in);
        })
    }

    // checking limit
    if(limit && dataArr.length > 6) {
        dataArr = dataArr.slice(0,6);
        document.getElementById("show-all").classList.remove("d-none");
    }
    else{
        document.getElementById("show-all").classList.add("d-none");
    }

    // chcking for no data

    if(dataArr.length) document.getElementById("no-found-message").classList.add("d-none");

   
    // displaying all data

    dataArr.forEach(arr =>{

        
        const data  = document.createElement('div');
        data.classList.add('col');
        data.innerHTML = `

        <div class="card px-2 py-3">
                <img src="${arr.image}" class="card-img-top img-fluid figure-img rounded" alt="" style="height: 12rem;">
                    <div class="card-body p-1">
                        <h5 class="card-title" id="card-title">Features</h5>
                        <div class="fst-normal" style="font-size: smaller;">

                            <p class="m-0">1.  ${(arr.features[0])?arr.features[0]:"-----"}</p>
                            <p class="m-0">2.  ${(arr.features[1])?arr.features[1]:"-----"}</p>
                            <p class="m-0">3.  ${(arr.features[2])?arr.features[2]:"-----"}</p>

                        </div>
                    <div class="footer mt-3" style="height:4.5rem">
                            <div class="d-flex justify-content-between align-items-center border-top p-1">
                                <p class="fw-bold fs-4">${arr.name}</p>
                                <button onclick="details('${arr.id}')" href="#" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" id="card-${arr.id}"><i class="bi bi-arrow-right fs-6"></i></button>
                            </div>
                        <p><i class="bi bi-calendar me-2"></i><span>${arr.published_in}</span></p>
                    </div>
                </div>
            </div>
        `;
        dataSection.appendChild(data);
        // stop spinner
        spinner(false);
    });
}

// load data on load
loadData();

// show all data
document.getElementById("show-all").addEventListener("click", ()=>{
loadData(false);
})

// spinner
function spinner (val) {
    if(val) document.getElementById("spinner").classList.remove("d-none");
    else document.getElementById("spinner").classList.add("d-none");
}

// calling details
const details = async id =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);
}

// showing details
function showDetails(data){

    const cardLeft =document.getElementById("details-body");
    cardLeft.innerHTML =
    `
    <h5 class="card-title" id="example-title">${data.description}</h5>
                   
                    <div class="row row-cols-3 text-center mt-4">

                      <p class="text-danger col bg-secondary-subtle py-1 m-2 w-25 mx-auto">${(data.pricing?.[0].price)?data.pricing[0].price :"no data"}<br>${data.pricing?.[0].plan?data.pricing[0].plan :"no data"}</p>
                      <p class="text-warning col bg-secondary-subtle py-1 m-2 w-25 mx-auto">${(data.pricing?.[1].price)?data.pricing[1].price :"no data"}<br>${data.pricing?.[1].plan?data.pricing[1].plan :"no data"}</p>
                      <p class="text-success col bg-secondary-subtle py-1 m-2 w-25 mx-auto">${(data.pricing?.[2].price)?data.pricing[2].price :"no data"}<br>${data.pricing?.[2].plan?data.pricing[2].plan :"no data"}</p>
                
                    </div>
                    <!-- feature intregation -->
                    <div class="row row-cols-2 row mt-5">

                      <!-- features -->

                      <div class="col">
                      <h5 class="card-title fw-bold mb-3">Features</h5>
                        <div class="fst-normal" style="font-size: smaller;">
                            <li class="m-2 text-secondary"> ${data.features[1]?data.features[1].feature_name:"----"}</li>
                            <li class="m-2 text-secondary">${data.features[1]?data.features[1].feature_name:"----"}</li>
                            <li class="m-2 text-secondary">${data.features[2]?data.features[2].feature_name:"----"}</li>
                            <li class="m-2 text-secondary">${data.features[3]?data.features[3].feature_name:"----"}</li>
                            <li class="m-2 text-secondary">${data.features[4]?data.features[4].feature_name:"----"}</li>
                        </div>
                      </div>

                      <!-- integration -->

                      <div class="col">
                        <h5 class="card-title fw-bold mb-3">Integrations</h5>
                          <div class="fst-normal" style="font-size: smaller;">
                              <li class="m-2 text-secondary">${(data.integrations?.[0])?data.integrations[0] : "----"}</li>
                              <li class="m-2 text-secondary">${(data.integrations?.[1])?data.integrations[1] : "----"}</li>
                              <li class="m-2 text-secondary">${(data.integrations?.[2])?data.integrations[2] : "----"}</li>
                              <li class="m-2 text-secondary">${(data.integrations?.[3])?data.integrations[3] : "----"}</li>
                              <li class="m-2 text-secondary">${(data.integrations?.[4])?data.integrations[4] : "----"}</li>
                          </div>
                        </div>

                    </div>
    `
    ;

    document.getElementById("image-details").src=`${data.image_link[0]}`;
    
    // console.log(data.accuracy.score);

    if(data.accuracy.score){
        document.getElementById("accuracy").classList.remove("d-none");
        document.getElementById("accuracy").innerText = `${(data.accuracy.score) * 100}% accuracy`;
    }else{
        document.getElementById("accuracy").classList.add("d-none");
    }
}
// sorting
document.getElementById("sort").addEventListener("click", ()=>{
    sorted = true;
    loadData();
})