// Setup darkreader for CORS
DarkReader.setFetchMethod(url => {
    let headers = new Headers()
    headers.append('Access-Control-Allow-Origin', '*')
  
    return window.fetch(url, {
      headers,
      mode: 'no-cors',
    })
  })
  
  function darkModeSelected() {
    let darkModeSelected = localStorage.getItem('darkMode');
  
    if (darkModeSelected === "false"){
      return false;
    }
    if (darkModeSelected === "true") {
      return true;
    }
    return darkModeSelected;
  }
  
  function darkModeEnabled() {
    if (darkModeSelected() === true) {
      return true;
    }
    if (darkModeSelected() === null && darkModePreferred === true) {
      return true;
    }
    return false;
  }
  
  // set color mode and icons on page load
  function checkDarkMode() {
    if (darkModeEnabled()) {
      DarkReader.enable();
    } else {
      DarkReader.disable();
    }
  
    if (darkModeSelected() === true) {
      setIconsDarkModeOn();
    } else if (darkModeSelected() === false) {
      setIconsDarkModeOff();
    }
  }
  
  function toggleDarkMode() {
    if (darkModeEnabled()) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  }
  
  function enableDarkMode() {
    DarkReader.enable();
    localStorage.setItem('darkMode', 'true');
    setIconsDarkModeOn();
  }
  
  function disableDarkMode() {
    DarkReader.disable();
    localStorage.setItem('darkMode', 'false');
    setIconsDarkModeOff();
  }
  
  function setIconsDarkModeOn() {
    iconLight.style.color = "grey";
    iconDark.style.color = "blue";
  }
  
  function setIconsDarkModeOff() {
    iconDark.style.color = "grey";
    iconLight.style.color = "blue";
  }