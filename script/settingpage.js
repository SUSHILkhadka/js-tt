function settingpage() {

    let settingpage = document.querySelector('.settingpage');
    settingpage.style.display = 'block';

    let backbutton = document.createElement('button')
    backbutton.innerHTML = 'back';
    backbutton.style.position = 'absolute';
    backbutton.style.top = '0px';
    backbutton.style.right = '0px';
    backbutton.addEventListener('click', function event(e) {
        settingpage.style.display = 'none';
        menu.style.display = 'block';

        return 0;
    })
    settingpage.append(backbutton);


    let save = document.querySelector('#save');
    save.addEventListener('click',function event(e) {

        // let a=
        // let b=
        // let c=
        // let d=

        // localStorage.setItem('player1Name_TableTennis', a)
        // localStorage.setItem('player2Name_TableTennis', b)
        // localStorage.setItem('toWinScore_TableTennis', c)
        // localStorage.setItem('changeServeOn', d)

        // localStorage.setItem('player1Name_TableTennis', "Ram")



    })






    settingpage.append(backbutton);




}