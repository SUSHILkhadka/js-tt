var fetchedData = [];
var totalnumber = 0;



function bringHighscoreList() {
    fetch("http://localhost:3000/api/fetch").
        then(r => r.json())
        .then(response => {
            fetchedData = Object.assign(response);
            totalnumber = response.length;
            console.log(fetchedData);
        });

    //sort based on timetaken
    let sortedlist=[]
        return sortedlist;
}






function highscoreHandler(finishtime, name) {
    let topFiveList = bringHighscoreList();
    let lastelementid = "";

    for (let i = 0; i < topFiveList; i++) {
        let ithFinishTime = 0
        if (finishtime < ithFinishTime) {

            const body = JSON.stringify({
                "name": `${name}`,
                "timetaken": `${timetaken}`
            });


            fetch('http://localhost:3000/api/create', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(response => {
                    console.log('SUCCESS');
                    fetcher();
                }).catch(console.log);


            //add to firestore
            //delete last document using ith id


            const bodyremove = JSON.stringify({
                "id": `${lastelementid}`,
            });

            fetch('http://localhost:3000/api/delete', {
                method: 'POST',
                bodyremove,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(response => {
                    console.log('SUCCESS');
                }).catch(console.log);
        }
    }

}
