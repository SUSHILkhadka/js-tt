async function highscorepage() {
    console.log('gg');
    let list=await bringHighscoreList();

    let highscore_container=document.createElement('div');
    document.body.append(highscore_container);

    for(let i=0;i<list.length;i++){
    let scorediv=document.createElement('div');

    let namediv=document.createElement('h2');
    let timediv=document.createElement('p');
    namediv.innerHTML=`${list[i]['name']}`;
    timediv.innerHTML=`${list[i]['timetaken']}`;

    scorediv.append(namediv);
    scorediv.append(timediv);

    highscore_container.append(scorediv);

    }

    let backbutton = document.createElement('button')
    backbutton.innerHTML = 'back';
    // backbutton.style.position = 're';
    // backbutton.style.top = '0px';
    // backbutton.style.right = '0px';
    backbutton.addEventListener('click', function event(e) {
        highscore_container.innerHTML = '';
        menu.style.display = 'block';
        return 0;
    })
    highscore_container.append(backbutton);

}

var fetchedData = [];
var totalnumber = 0;
async function bringHighscoreList() {

const response=await fetch("http://localhost:3000/api/fetch")

let list=await response.json();
console.log('before',list);
list.sort((a,b)=>{
    return a['timetaken'] - b['timetaken'];
});
// list.sort((a, b) => {
//                 return a['timetaken'] - b['timetaken'];
//             });
console.log('after',list);
return list;
    //sort based on timetaken
}


const maxlength = 3;
async function highscoreHandler(finishtime, name) {
    // let list =bringHighscoreList();
    let list = await bringHighscoreList();

    if(list.length<maxlength){
        let body = JSON.stringify({
            "name": `${name}`,
            "timetaken": `${finishtime}`
        });
        console.log("body=",body)

        let resonse_after_add=await fetch("http://localhost:3000/api/create",{
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(resonse_after_add);
        return 0;

    }

    for (let i = 0; i < maxlength; i++) {
        console.log('i+1th finish time',i,list[i]['timetaken'])
        if (finishtime < list[i]['timetaken']) {
            let body = JSON.stringify({
                "id": `${list[list.length-1]['id']}`,
                "name": `${name}`,
                "timetaken": `${finishtime}`
            });
            console.log("body=",body)

            let resonse_after_update=await fetch("http://localhost:3000/api/update",{
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(resonse_after_update);


            //add to firestore
            //delete last document using ith id
            return 0;
        }
    }

}


