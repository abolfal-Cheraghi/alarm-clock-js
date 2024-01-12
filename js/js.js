const timeNow = document.querySelector('#clock-time')
const selectMenu = document.querySelectorAll("select");
const setAla = document.querySelector("#set-ala");
const divContent = document.querySelector(".content");

const ringtone = new Audio('./audio/audio.mp3');


let alarmtime , alarmState = 'noset'; 





//ساخت option ها
for(let i = 23 ; i >=0 ; i--){
  //خلاصش پایین نوشتع
  // if(i<10) i = '0'+ i
  // else i = i
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML('afterend' , option)
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}






//نشان دادن ساعت 
setInterval(() => { 
    let D = new Date();
    let h = D.getHours();
    let m = D.getMinutes();
    let s = D.getSeconds();
    h = h < 10 ? '0' + h : h ;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    timeNow.innerHTML =  h + ':' + m + ':' + s  ;
;

if(alarmtime == h + ':' + m ){
    ringtone.play()
    ringtone.loop = true;
}
}, 1000);



//ایونت رویداد ست تایم دکمه
setAla.addEventListener('click' , ()=>{
    alarmtime = `${selectMenu[0].value}:${selectMenu[1].value}`;

    if (alarmtime.includes("hour") || alarmtime.includes("minute")) {
        return alert('زمان هشدار را به درستی مشخص کنید')
    }
   
    checkState(alarmState)
    
})


//ساخت تابع برای وضغیت ست بودن ساعت یا نبودن

function checkState(state){
    if(state == 'noset'){
        divContent.classList.add("disable");
        setAla.innerHTML = "clear alarm";
        alarmState = 'set';
    }else{
        divContent.classList.remove("disable");
        alarmtime = '';
        setAla.innerHTML = "set alarm";
        ringtone.pause();
        alarmState = 'noset'
    }
}