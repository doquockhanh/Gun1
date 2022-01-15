const KeyEvent = function (){
  const attr = {};

  let evt_up_down = {w: 0, s: 0, a: 0, d: 0};
  let evt_down = {" ": false}

  onkeydown = d => {
    evt_up_down[d.key.toLowerCase()] = 1;
    evt_down[d.key] = !evt_down[d.key]; // it seem unused
    outerKeyDownFunction(d.key.toLowerCase());
  }
  onkeyup = d => {
    evt_up_down[d.key.toLowerCase()] = 0;
    outerKeyUpFunction(d.key.toLowerCase());
  }

  // !important
  // this use to call outer function
  function outerKeyDownFunction(key) {
      Movements.setEvent(key);
      FireEvent.setKey(key, true);
  }

  // !important
  // this use to call outer function
  function outerKeyUpFunction(key) {
    FireEvent.setKey(key, false);
  }

  attr.up_down = function () {
    return evt_up_down
  };
  attr.down = function () {
    return evt_down
  };

  return attr;
}()