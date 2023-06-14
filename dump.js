/////////
  function handleEvent(passedInElement) {
      return function(e) {
          func(e, passedInElement);
      };
  }

  element.addEventListener('click', handleEvent(this.elements[i]));
  /////////
