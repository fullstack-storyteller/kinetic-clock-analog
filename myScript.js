const animation_delay_quantum_hrs = 3600;
const animation_delay_quantum_mins = 60;
const animation_delay_quantum_secs = 1;
//time quantum after which hours animation will start

const [hh, mm, ss_daypart] = [...new Date().toLocaleTimeString().split(':')];
const [ss, daypart] = ss_daypart.split(' ');

const initClockFrame = (delay, z_index, members, identifier, initial) => {
  let i = Number(initial);
  let counter = 0;
  while (counter < members) {
    if (i >= members) {
      i %= members;
    }
    // console.log(`.${identifier}${i}`);
    let diff = 0;
    if (identifier === 'm') {
      diff = ss;
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

const localTime = document.querySelector('.local-time span');

const Timer = () => {
  //   x++;
  localTime.textContent = new Date().toLocaleTimeString();
};
Timer(localTime);
let start = setInterval(Timer, 1000);
const lastRefreshedTime = document.querySelector('.last-refreshed-time span');
lastRefreshedTime.textContent = new Date().toLocaleTimeString();
