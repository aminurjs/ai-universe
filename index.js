const loadAi = async( isSeeMore) =>{
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aiList = data.data;
    setAiList(aiList, isSeeMore);
}
const setAiList = (aiList, isSeeMore) =>{
    const aiContainer = document.getElementById('ai-container');
    let aiTools = aiList.tools;

    if(!isSeeMore){
        aiTools = aiTools.slice(0, 6);
    }

    aiTools.forEach(aiTool => {
        const features = aiTool.features
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card bg-base-100 shadow-md p-5">
                <figure><img class="w-full" src="${aiTool.image !== 'https://www.proremodeler.com/sites/proremodeler/files/Jasper%20copy.jpg' ? aiTool.image : './jasper.webp'}" alt="ChatGPT" /></figure>
                <div class="card-body px-1 border-b border-gray-300 pb-4 mb-4">
                    <h2 class="card-title text-[#111] font-semibold">Features</h2>
                    <ol class="text-left list-decimal list-inside">
                        <li>${features[0]}</li>
                        <li>${features[1]}</li>
                        <li class="${features[2] ? '' : 'invisible'}">${features[2]}</li>
                        <li class="${features[3] ? '' : 'invisible'}">${features[3]}</li>
                    </ol>
                </div>
                <div class="card-actions w-full flex justify-between py-2">
                    <div class="">
                        <h4 class="card-title text-[#111] font-semibold">${aiTool.name}</h4>
                        <p class="text-base text-[#585858]"><img class="inline w-5" src="./icon/calender.svg" alt=""> ${aiTool.published_in}</p>
                    </div>
                    <button onclick="modal('${aiTool.id}')" class="btn rounded-full p-2.5 mr-3"><img src="./icon/arrow.svg" alt=""></button>
                </div>
            </div>
        `;
        aiContainer.appendChild(div);
    });
    loading(false);
}
const seeMore = () => {
    const hidden = document.getElementById('see-more');
    hidden.classList.add('hidden');
    loading(true);
    loadAi(true)
}
const loading = (isLoading) =>{
    const loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}
const modal = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const aiData = data.data;
    setAiData(aiData);
}
const setAiData = aiData =>{
    const modalContainer = document.getElementById('modal');
    modalContainer.textContent= '';
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="p-5 flex gap-5 flex-col-reverse lg:flex-row">
            <div class="bg-[#EB57570D] p-6 rounded-lg mb-8 lg:mb-0">
                <h3 class="text-lg text-left text-[#111] font-semibold mb-4">${aiData.description}</h3>
                <div class="flex justify-between mb-5 gap-4">
                    <div class="p-3 px-3 bg-white rounded-lg"><h4 class="text-base text-center text-green-500 font-medium">${aiData.pricing[0]?.price}<br>${aiData.pricing[0]?.plan}</h4></div>
                    <div class="p-3 px-3 bg-white rounded-lg"><h4 class="text-base text-center text-orange-500 font-medium">${aiData.pricing[1]?.price}<br>${aiData.pricing[1]?.plan}</div>
                    <div class="p-3 px-3 bg-white rounded-lg"><h4 class="text-base text-center text-rose-500 font-medium">Contact us<br>${aiData.pricing[1]?.plan}</h4></div>
                </div>
                <div class="flex gap-5">
                    <div class="">
                        <h2 class="text-lg text-left text-[#111] font-semibold">Features</h2>
                        <ul class="text-left text-sm list-disc list-inside">
                            <li>${aiData.features[1]?.feature_name}</li>
                            <li>${aiData.features[2]?.feature_name}</li>
                            <li>${aiData.features[3]?.feature_name}</li>
                        </ul>
                    </div>
                    <div class="">
                        <h2 class="text-lg text-[#111] font-semibold text-left">Integrations</h2>
                        <ul class="text-left text-sm list-disc list-inside">
                        <li>${aiData.integrations[0]}</li>
                        <li>${aiData.integrations[1]}</li>
                        <li>${aiData.integrations[2]}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-6 rounded-lg">
                <img class="rounded-lg mb-5" src="${aiData.image_link[0]}" alt="">
                <h2 class="text-2xl text-[#111] font-semibold mb-5">${aiData.input_output_examples[0]?.input}</h2>
                <p class="text-base text-[#585858]">${aiData.input_output_examples[0]?.output}</p>
            </div>
        </div>
    `;
    modalContainer.appendChild(div);
    show_details_modal.showModal();
}

loading(true);
loadAi(false);