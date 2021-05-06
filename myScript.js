const animation_delay_quantum_hrs = 3600;
const animation_delay_quantum_mins = 60;
const animation_delay_quantum_secs = 1;
//time quantum after which hours animation will start

const initClockFrame = (delay, z_index, members, identifier) => {
  for (let i = 0; i < members; i++) {
    document
      .querySelector(`.${identifier}${i}`)
      .style.setProperty('animation-delay', `${delay * i}s`);

    document
      .querySelector(`.${identifier}${i}`)
      .style.setProperty('z-index', `${z_index - i}`);
  }
};

initClockFrame(animation_delay_quantum_hrs, 1300, 12, 'n');
initClockFrame(animation_delay_quantum_mins, 600, 60, 'm');
initClockFrame(animation_delay_quantum_secs, 200, 60, 's');

const localTime = document.querySelector('.local-time span');

const Timer = () => {
  //   x++;
  localTime.textContent = new Date().toLocaleTimeString();
  //   stop();
};
Timer(localTime);
let start = setInterval(Timer, 1000);
const lastRefreshedTime = document.querySelector('.last-refreshed-time span');
lastRefreshedTime.textContent = new Date().toLocaleTimeString();
