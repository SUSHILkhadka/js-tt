const menu=document.querySelector('.menu')
const singleplayer=document.querySelector('.singleplayer')
const multiplayer=document.querySelector('.multiplayer')
const training=document.querySelector('.training')

const highscore=document.querySelector('.highscore')


singleplayer.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(1);
})
multiplayer.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(2);
})
training.addEventListener('click',function event(e){
    menu.style.display='none';
    gameloop(1,1);
})
