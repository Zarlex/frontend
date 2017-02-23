export function animate(start: number, end: number, fn: Function, speed: number = 2000, easing: string = 'easeOutSine') {
  // scrollTargetY: the target scrollY property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  let myFirstPromise = new Promise(function (resolve, reject) {
    //We call resolve(...) when what we were doing async succeeded, and reject(...) when it failed.
    //In this example, we use setTimeout(...) to simulate async code.
    //In reality, you will probabally using something like XHR or an HTML5 API.
    setTimeout(function () {
      resolve("Success!"); //Yay! Everything went well!
    }, 250);
  });

  let current: number = start, currentTime = 0;

  // min time .1, max time .8 seconds
  let time = Math.max(.1, Math.min(Math.abs(start - end) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  let PI_D2 = Math.PI / 2,
    easingEquations = {
      easeOutSine: function (pos: number) {
        return Math.sin(pos * (Math.PI / 2));
      },
      easeInOutSine: function (pos: number) {
        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
      },
      easeInOutQuint: function (pos: number) {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow((pos - 2), 5) + 2);
      }
    };

  // add animation loop
  function tick(callback: Function) {
    currentTime += 1 / 60;

    let p = currentTime / time;
    let t = easingEquations[easing](p);

    console.log(current, start, end)
    if (p < 1) {
      window.requestAnimationFrame(() => {
        tick(callback);
      });
      current += (end - current) * t;
      fn(current);
    } else {
      console.info('DONE')
      fn(current);
      callback();
    }
  }

  // call it once to get started
  return new Promise((resolve: Function) => {
    tick(resolve);
  });

}

export function animate2(start: number, end: number, fn: Function, duration: number = 1000) {

  let incrementStep = Math.abs(end - start) / ((duration / 100) * 6);
  let current = start;

  function tick(callback: Function, duration: number, startTimestamp: number) {

    let progress = +new Date() - startTimestamp;
    let next: number;
    if(start > end){
      next = current -= incrementStep;
      next = next < end ? end : next;
    } else {
      next = current += incrementStep;
      next = next > end ? end : next;
    }

    if (progress < duration) {
      window.requestAnimationFrame(function () {
        tick(callback, duration, startTimestamp);
      });
      fn(next);
      current = next;
    } else {
      callback();
    }
  }

  return new Promise((resolve: Function) => {
    tick(resolve, duration, +new Date());
  });
}
