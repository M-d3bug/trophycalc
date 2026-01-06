const trophyPoints = {
  previous: { bronze: 15, silver: 30, gold: 90, platinum: 180 },
  current: { bronze: 15, silver: 30, gold: 90, platinum: 300 }
};

const levels = [
  { name: 'Bronze 2', target: 100 },
  { name: 'Bronze 3', target: 200 },
  { name: 'Silver 1', target: 300 },
  { name: 'Silver 2', target: 400 },
  { name: 'Silver 3', target: 500 },
  { name: 'Gold 1', target: 600 },
  { name: 'Gold 2', target: 700 },
  { name: 'Gold 3', target: 800 },
  { name: 'Platinum', target: 999 },
];

function calculatePoints(system, bronze, silver, gold, platinum) {
  return bronze * trophyPoints[system].bronze +
    silver * trophyPoints[system].silver +
    gold * trophyPoints[system].gold +
    platinum * trophyPoints[system].platinum;
}

function getPointsForLevel(system, level) {
  let totalPoints = 0;

  if (system === 'previous') {
    const levelPoints = [0, 200, 600, 1200, 2400, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 24000];
    if (level < 14) {
      totalPoints = levelPoints[level - 1]; // the level starts at 1 but the index of the array starts at 0
    } else {
      totalPoints = levelPoints[12] + 8000 * (level - 13);
    }
  } else if (system === 'current') {
    for (let i = 1; i < level; i++) { // the level starts at 1 so the loop starts at 1
      if (i < 100) {
        totalPoints += 60;
      } else if (i < 200) {
        totalPoints += 90;
      } else if (i < 300) {
        totalPoints += 450;
      } else if (i < 400) {
        totalPoints += 900;
      } else if (i < 500) {
        totalPoints += 1350;
      } else if (i < 600) {
        totalPoints += 1800;
      } else if (i < 700) {
        totalPoints += 2250;
      } else if (i < 800) {
        totalPoints += 2700;
      } else if (i < 900) {
        totalPoints += 3150;
      } else {
        totalPoints += 3600;
      }
    }
  }

  return totalPoints;
}

function calculateLevel(system, points) {
  let level = 1; // the level starts at 1
  let totalPoints = 0;

  while (totalPoints <= points) {
    totalPoints = getPointsForLevel(system, level + 1);
    if (totalPoints <= points) {
      level++;
    }
  }

  return level;
}

function getLevelImage(level) {
  let imagePath = 'img/level/current/bronze_level_1.webp';
  if (level <= 99) imagePath = 'img/level/current/bronze_level_1.webp';
  else if (level <= 199) imagePath = 'img/level/current/bronze_level_2.webp';
  else if (level <= 299) imagePath = 'img/level/current/bronze_level_3.webp';
  else if (level <= 399) imagePath = 'img/level/current/silver_level_1.webp';
  else if (level <= 499) imagePath = 'img/level/current/silver_level_2.webp';
  else if (level <= 599) imagePath = 'img/level/current/silver_level_3.webp';
  else if (level <= 699) imagePath = 'img/level/current/gold_level_1.webp';
  else if (level <= 799) imagePath = 'img/level/current/gold_level_2.webp';
  else if (level <= 998) imagePath = 'img/level/current/gold_level_3.webp';
  else if (level == 999) imagePath = 'img/level/current/platinum_level.webp'
  return imagePath;
}

function defineNextSteps(currentPoints, currentLevel) {
  const template = document.getElementById('progress-bar-template');
  const container = document.querySelector('.next-steps');
  container.innerHTML = '';
  for (let i = 0; i < levels.length; i++) {
    const nextLevel = levels[i].target;
    if (nextLevel > currentLevel) {
      const clone = template.content.cloneNode(true);
      const nextLevelRequiredPoints = getPointsForLevel('current', nextLevel);
      const progressPercentage = Math.floor((currentPoints) / (nextLevelRequiredPoints) * 100);
      var progressBar = clone.getElementById('current-system-current-progress');
      clone.getElementById('current-system-current-level-image').src = getLevelImage(currentLevel);
      clone.getElementById('current-system-current-level').textContent = currentLevel;
      clone.getElementById('current-system-current-points').textContent = currentPoints;
      clone.getElementById('current-system-progress-percentage').textContent = progressPercentage + '%';
      progressBar.style.width = progressPercentage + '%';
      progressBar.setAttribute('aria-valuenow', progressPercentage);
      clone.getElementById('current-system-points-until-next').textContent = nextLevelRequiredPoints - currentPoints + ' left';
      clone.getElementById('current-system-next-level-requirement').textContent = nextLevelRequiredPoints;
      clone.getElementById('current-system-next-level-image').src = getLevelImage(nextLevel);
      clone.getElementById('current-system-next-level').textContent = nextLevel;

      container.appendChild(clone);
    }
  }
}

function calculateTrophiesNeeded(points) {
  const bronze = Math.ceil(points / trophyPoints.current.bronze);
  const silver = Math.ceil(points / trophyPoints.current.silver);
  const gold = Math.ceil(points / trophyPoints.current.gold);
  const platinum = Math.ceil(points / trophyPoints.current.platinum);

  return { bronze, silver, gold, platinum };
}

function calculateGamesNeeded(points) {
  const pointsPerGame = 1300;
  return Math.ceil(points / pointsPerGame);
}

function saveToLocalStorage() {
  const data = {
    platinum: document.getElementById('current-platinum').value,
    gold: document.getElementById('current-gold').value,
    silver: document.getElementById('current-silver').value,
    bronze: document.getElementById('current-bronze').value,
    desiredLevel: document.getElementById('desired-level').value
  };
  localStorage.setItem('trophycalc_data', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem('trophycalc_data'));
  if (data) {
    document.getElementById('current-platinum').value = data.platinum || '';
    document.getElementById('current-gold').value = data.gold || '';
    document.getElementById('current-silver').value = data.silver || '';
    document.getElementById('current-bronze').value = data.bronze || '';
    document.getElementById('desired-level').value = data.desiredLevel || '';
    // Event listeners are set in setupEventListeners()
  }
}

function clearData() {
  if (confirm('Are you sure you want to clear all data?')) {
    document.getElementById('current-platinum').value = '';
    document.getElementById('current-gold').value = '';
    document.getElementById('current-silver').value = '';
    document.getElementById('current-bronze').value = '';
    document.getElementById('desired-level').value = '';
    localStorage.removeItem('trophycalc_data');
    updateData();
  }
}

function getCurrentTrophyCounts() {
  return {
    bronze: parseInt(document.getElementById('current-bronze').value) || 0,
    silver: parseInt(document.getElementById('current-silver').value) || 0,
    gold: parseInt(document.getElementById('current-gold').value) || 0,
    platinum: parseInt(document.getElementById('current-platinum').value) || 0
  };
}

function getCurrentTrophyPoints() {
  const counts = getCurrentTrophyCounts();
  return calculatePoints('current', counts.bronze, counts.silver, counts.gold, counts.platinum);
}

let lastTrophyData = null;

function updateData() {
  const trophyCounts = getCurrentTrophyCounts();
  const { bronze, silver, gold, platinum } = trophyCounts;

  const system = 'current';
  const currentPoints = calculatePoints(system, bronze, silver, gold, platinum);
  const currentLevel = calculateLevel(system, currentPoints);
  const currentLevelRequiredPoints = getPointsForLevel(system, currentLevel);
  const nextLevel = currentLevel + 1;
  const nextLevelRequiredPoints = getPointsForLevel(system, nextLevel);
  const progressPercentage = Math.floor((currentPoints - currentLevelRequiredPoints) / (nextLevelRequiredPoints - currentLevelRequiredPoints) * 100);

  const progressBar = document.getElementById(system + '-system-current-progress');
  document.getElementById(system + '-system-current-points').textContent = currentPoints;

  document.getElementById(system + '-system-current-level').textContent = currentLevel <= 999 ? currentLevel : 999;
  document.getElementById(system + '-system-next-level').textContent = nextLevel <= 999 ? nextLevel : 999;

  const currentLevelimagePath = getLevelImage(currentLevel <= 999 ? currentLevel : 999);
  const nextLevelImagePath = getLevelImage(nextLevel <= 999 ? nextLevel : 999);
  document.getElementById('current-system-current-level-image').src = currentLevelimagePath;
  document.getElementById('current-system-next-level-image').src = nextLevelImagePath;

  document.getElementById(system + '-system-current-level-requirement').textContent = currentLevel <= 999 ? currentLevelRequiredPoints : 0;
  document.getElementById(system + '-system-next-level-requirement').textContent = nextLevel <= 999 ? nextLevelRequiredPoints : 0;
  document.getElementById(system + '-system-points-until-next').textContent = nextLevel <= 999 ? nextLevelRequiredPoints - currentPoints + ' left' : '0 left';
  document.getElementById(system + '-system-progress-percentage').textContent = nextLevel <= 999 ? progressPercentage + '%' : '100%';

  if (progressBar) {
    progressBar.style.width = nextLevel <= 999 ? progressPercentage + '%' : '100%';
    progressBar.setAttribute('aria-valuenow', nextLevel <= 999 ? progressPercentage : 100);
  }

  defineNextSteps(currentPoints, currentLevel);

  // Desired Level Logic
  const desiredLevelInput = document.getElementById('desired-level');
  const desiredLevelResultsDiv = document.getElementById('desired-level-results');
  const desiredLevel = parseInt(desiredLevelInput.value) || 0;

  if (desiredLevel > 0) {
    const pointsNeeded = getPointsForLevel('current', desiredLevel) - currentPoints;
    if (pointsNeeded > 0) {
      const trophiesNeeded = calculateTrophiesNeeded(pointsNeeded);
      const gamesNeeded = calculateGamesNeeded(pointsNeeded);
      desiredLevelResultsDiv.innerHTML = `
            <p class="info-text">Points needed: ${pointsNeeded}</p>
            <p class="info-text">Trophies needed: 
              <span class="bronze-text"><strong>bronze</strong></span>: ${trophiesNeeded.bronze} or 
              <span class="silver-text"><strong>silver</strong></span>: ${trophiesNeeded.silver} or 
              <span class="gold-text"><strong>gold</strong></span>: ${trophiesNeeded.gold}
            </p>
            <p class="info-text">Games needed: ${gamesNeeded}</p>
          `;
    } else {
      desiredLevelResultsDiv.innerHTML = `<p class="info-text">You have already reached or exceeded the desired level.</p>`;
    }
  } else {
    desiredLevelResultsDiv.innerHTML = '';
  }

  // Memoization: Only update donut if data changed
  const currentDataKey = JSON.stringify(trophyCounts);
  if (currentDataKey !== lastTrophyData) {
    updateVisualDistribution(bronze, silver, gold, platinum);
    lastTrophyData = currentDataKey;
  }

  saveToLocalStorage();
}

function setTheme(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('trophycalc_theme', theme);
  if (theme === 'light') {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }
}

// Call updateData on page load
window.onload = () => {
  const savedTheme = localStorage.getItem('trophycalc_theme') || 'dark';
  setTheme(savedTheme);

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  loadFromLocalStorage();
  setupEventListeners();
  updateData();
  setupPerformanceOptimizations();
};

function setupPerformanceOptimizations() {
  // 1. Intersection Observer for Backdrop Filter
  // Only apply blur to elements in the viewport
  const glassElements = document.querySelectorAll('.glass-card, .card:not(.flip-container), .flip-front, .flip-back');

  const observerOptions = {
    root: null,
    rootMargin: '100px',
    threshold: 0.1
  };

  const blurObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  glassElements.forEach(el => blurObserver.observe(el));
}

function setupEventListeners() {
  // Clear Data
  document.getElementById('clear-btn').addEventListener('click', clearData);

  // Info Modal
  const infoBtn = document.getElementById('info-btn');
  const infoModal = document.getElementById('info-modal');
  const closeInfo = document.getElementById('close-info');

  infoBtn.addEventListener('click', () => {
    infoModal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });

  closeInfo.addEventListener('click', () => {
    infoModal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
      infoModal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });

  // Theme Toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Flip Card Toggle with Dynamic 3D Context
  const flipCard = document.getElementById('progression-flip-card');
  if (flipCard) {
    flipCard.addEventListener('click', (e) => {
      // Don't flip if clicking clear button or other interactive elements
      if (e.target.closest('button') || e.target.closest('input')) return;

      // Enable 3D context only during animation
      flipCard.classList.add('enabling-3d');
      flipCard.classList.toggle('flipped');

      // Clean up after animation (0.8s matches CSS transition)
      setTimeout(() => {
        if (!flipCard.classList.contains('flipped')) {
          flipCard.classList.remove('enabling-3d');
        }
      }, 850);
    });
  }

  // Preset Buttons
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const preset = btn.dataset.preset;
      applyPreset(preset);
    });
  });

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedUpdateData = debounce(updateData, 150);

  // Trophy Inputs
  ['current-platinum', 'current-gold', 'current-silver', 'current-bronze', 'desired-level'].forEach(id => {
    const input = document.getElementById(id);
    if (input) input.addEventListener('input', debouncedUpdateData);
  });
}

function applyPreset(type) {
  const currentPoints = getCurrentTrophyPoints();
  const currentLevel = calculateLevel('current', currentPoints);
  const input = document.getElementById('desired-level');
  let target = 0;

  switch (type) {
    case 'milestone':
      if (currentLevel < 50) target = 50;
      else if (currentLevel < 100) target = 100;
      else target = Math.ceil((currentLevel + 1) / 100) * 100;
      break;

    case 'rank':
      // PlayStation Level Ranks:
      // Bronze: 1-299
      // Silver: 300-599
      // Gold: 600-998
      // Platinum: 999
      if (currentLevel < 300) target = 300;
      else if (currentLevel < 600) target = 600;
      else target = 999;
      break;

    case 'max':
      target = 999;
      break;
  }

  if (target > 0) {
    input.value = target;
    updateData();
  }
}

function updateVisualDistribution(bronze, silver, gold, platinum) {
  const total = bronze + silver + gold + platinum;
  const donut = document.getElementById('trophy-donut-chart');
  const countDisplay = document.getElementById('total-trophy-count');
  const legend = document.getElementById('distribution-legend');

  if (!donut || !countDisplay || !legend) return;

  countDisplay.textContent = total;

  if (total === 0) {
    donut.style.background = 'var(--ps-blue-alt)';
    legend.innerHTML = '<p style="text-align:center; opacity:0.5; font-size:0.8rem;">No trophies yet</p>';
    return;
  }

  const pPlatinum = (platinum / total) * 100;
  const pGold = (gold / total) * 100;
  const pSilver = (silver / total) * 100;
  const pBronze = (bronze / total) * 100;

  // Build conic gradient stops
  let current = 0;
  const stops = [];

  if (pPlatinum > 0) {
    stops.push(`var(--donut-platinum) ${current}% ${current + pPlatinum}%`);
    current += pPlatinum;
  }
  if (pGold > 0) {
    stops.push(`var(--donut-gold) ${current}% ${current + pGold}%`);
    current += pGold;
  }
  if (pSilver > 0) {
    stops.push(`var(--donut-silver) ${current}% ${current + pSilver}%`);
    current += pSilver;
  }
  if (pBronze > 0) {
    stops.push(`var(--donut-bronze) ${current}% ${current + pBronze}%`);
    current += pBronze;
  }

  donut.style.background = `conic-gradient(${stops.join(', ')})`;

  // Update Legend
  const data = [
    { label: 'Platinum', val: pPlatinum, color: 'var(--donut-platinum)' },
    { label: 'Gold', val: pGold, color: 'var(--donut-gold)' },
    { label: 'Silver', val: pSilver, color: 'var(--donut-silver)' },
    { label: 'Bronze', val: pBronze, color: 'var(--donut-bronze)' }
  ];

  legend.innerHTML = data
    .filter(item => item.val > 0)
    .map(item => `
      <div class="legend-item">
        <div class="legend-label">
          <div class="legend-color" style="background: ${item.color}"></div>
          <span>${item.label}</span>
        </div>
        <span class="legend-val">${item.val.toFixed(1)}%</span>
      </div>
    `).join('');
}
