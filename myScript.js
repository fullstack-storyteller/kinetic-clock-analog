const animation_delay_quantum_hrs = 3600;
const animation_delay_quantum_mins = 60;
const animation_delay_quantum_secs = 1;
//time quantum after which hours animation will start

//initial value of the clock
const [hh, mm, ss_daypart] = [...new Date().toLocaleTimeString().split(':')];
const [ss, daypart] = ss_daypart.split(' ');

const initClockFrame = (delay, z_index, members, identifier, initial) => {
  let i = Number(initial);
  let counter = 0;
  while (counter < members) {
    if (i >= members) {
      i %= members;
    }
    //console.log(`.${identifier}${i}`);
    let diff = 0;
    if (identifier === 'm') {
      diff = ss;
    }
    if (identifier === 'n') {
      diff = mm * 60;
    }
    document
      .querySelector(`.${identifier}${i}`)
      .style.setProperty('animation-delay', `${delay * counter - diff}s`);

    document
      .querySelector(`.${identifier}${i}`)
      .style.setProperty('z-index', `${z_index - counter}`);

    i++;
    counter++;
  }
};

initClockFrame(animation_delay_quantum_hrs, 1300, 12, 'n', hh);
initClockFrame(animation_delay_quantum_mins, 600, 60, 'm', mm);
initClockFrame(animation_delay_quantum_secs, 200, 60, 's', ss);

//this timer will check and ensure correct hours is displayed in active hour div
let counterhour = 0;
let counterAmPM = 0;
let diffAmPm = 59 - ss + (59 - mm) * 60 + (11 - hh) * 3600;
let diffhour = 59 - ss + (59 - mm) * 60;
const activeHrs = document.querySelector('.active-hour');
const ampm = document.querySelector('.ampm');
activeHrs.textContent = Number(hh);
ampm.textContent = daypart;
const chkHours = () => {
  if (counterhour > diffhour) {
    activeHrs.textContent = (Number(activeHrs.textContent) + 1) % 12;
    counterhour = 0;
    diffhour = 3600;
  }
  if (counterAmPM > diffAmPm) {
    ampm.textContent = ampm.textContent === 'AM' ? 'PM' : 'AM';
    counterAmPM = 0;
    diffAmPm = 43200;
  }
  counterAmPM++;
  counterhour++;
};

let start = setInterval(chkHours, 1000);
