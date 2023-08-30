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
                    <button onclick="modal(${aiTool.id})" class="btn rounded-full p-2.5 mr-3"><img src="./icon/arrow.svg" alt=""></button>
                </div>
            </div>
        `;
        aiContainer.appendChild(div);
        console.log(aiTool)
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
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/01`);
    const data = await res.json();
    const aiData = data.data;
    setAiData(aiData);
}
const setAiData = aiData =>{
    const modalContainer = document.getElementById('modal');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="p-5 flex gap-5 flex-col-reverse lg:flex-row">
            <div class="bg-[#EB57570D] p-6 rounded-lg mb-8 lg:mb-0">
                <h3 class="text-lg text-left text-[#111] font-semibold mb-4">${aiData.description}</h3>
                <div class="flex justify-between mb-5">
                    <div class="p-3 px-6 bg-white rounded-lg"><h4 class="text-base text-center text-green-500 font-medium">$10/<br>month<br>Basic</h4></div>
                    <div class="p-3 px-6 bg-white rounded-lg"><h4 class="text-base text-center text-orange-500 font-medium">$50/<br>month<br>pro</h4></div>
                    <div class="p-3 px-6 bg-white rounded-lg"><h4 class="text-base text-center text-rose-500 font-medium">Contact<br>us<br>Enterprise</h4></div>
                </div>
                <div class="flex gap-4">
                    <div class="">
                        <h2 class="text-lg text-left text-[#111] font-semibold">Features</h2>
                        <ul class="text-left text-sm list-disc list-inside">
                            <li>Contextual understanding</li>
                            <li>Multi-platform support</li>
                            <li>Voice recognition</li>
                        </ul>
                    </div>
                    <div class="">
                        <h2 class="text-lg text-[#111] font-semibold">Integrations</h2>
                        <ul class="text-left text-sm list-disc list-inside">
                            <li>FB Messenger</li>
                            <li>Slack</li>
                            <li>Telegram</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="p-6 rounded-lg">
                <img class="rounded-lg mb-5" src="./1.jpeg" alt="">
                <h2 class="text-2xl text-[#111] font-semibold mb-5">Hi, how are you doing today?</h2>
                <p class="text-base text-[#585858]">I'm doing well, thank you for asking. How can I assist you today?</p>
            </div>
        </div>
    `;
    modalContainer.appendChild(div);
    show_details_modal.showModal();
}

loading(true);
loadAi(false);