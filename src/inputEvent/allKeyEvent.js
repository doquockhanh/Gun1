const AllKeyEvent = function (){
  const attr = {};

  let evt_up_down = {w: 0, s: 0, a: 0, d: 0};
  let evt_down = {" ": false}

  onkeydown = d => {
    evt_up_down[d.key.toLowerCase()] = 1;
    evt_down[d.key] = !evt_down[d.key];
    outerKeyDownFunction(d.key.toLowerCase());
  }
  onkeyup = d => evt_up_down[d.key.toLowerCase()] = 0;

  function outerKeyDownFunction(key) {
      Movements.setEvent(key);
  }

  function outerKeyUpFunction() {

  }

  attr.up_down = function () {
    return evt_up_down
  };
  attr.down = function () {
    return evt_down
  };

  attr.set_up_down = function (a) { // a like the current array
    evt_up_down = a;
  }

  attr.set_down = function (a) { // a like the current array
    evt_down = a;
  }
  return attr;
}()