function UnityProgress(gameInstance, progress) {
    if (!gameInstance.Module)
      return;
    if (!gameInstance.logo) {
      gameInstance.logo = document.createElement("div");
      gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
      gameInstance.container.appendChild(gameInstance.logo);
    }
    if (!gameInstance.progress) {    
      gameInstance.progress = document.createElement("div");
      gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
      gameInstance.progress.empty = document.createElement("div");
      gameInstance.progress.empty.className = "empty";
      gameInstance.progress.appendChild(gameInstance.progress.empty);
      gameInstance.progress.full = document.createElement("div");
      gameInstance.progress.full.className = "full";
      gameInstance.progress.appendChild(gameInstance.progress.full);
      gameInstance.container.appendChild(gameInstance.progress);
    }
    if (!gameInstance.changelog) {
      gameInstance.changelog = document.createElement("div");
      gameInstance.changelog.style = "position: absolute; left: 5%; top: 35%; height: 30%; width: 35%; color: white; display:none;"
      gameInstance.changelog.innerHTML = "<h3>Changes</h3><ul><li>Dec 12, 2024: Added invincibility, inf ammo and rapid fire</li><li>Feb 25, 2025: Made hacks toggleable in game, press backslash to toggle</li></ul>";
      if (new URLSearchParams(window.location.search).get("hacks") == "yes") {
        gameInstance.changelog.style.display = "inline";
      }
      gameInstance.container.appendChild(gameInstance.changelog);
    }
    gameInstance.progress.full.style.width = (100 * progress) + "%";
    gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
    if (progress == 1)
      gameInstance.logo.style.display = gameInstance.progress.style.display = gameInstance.changelog.style.display = "none";
  }