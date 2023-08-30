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
                <figure><img class="w-full" src="${aiTool.image}" alt="ChatGPT" /></figure>
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
                    <button class="btn rounded-full p-2.5 mr-3"><img src="./icon/arrow.svg" alt=""></button>
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
loading(true);
loadAi(false);