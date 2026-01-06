# TrophyCalc
A responsive, client-side web application designed to help PlayStation gamers track their trophy points, calculate their current account level, and estimate the effort required to reach new milestones.

### ✨ Features
- Real-Time Level Calculation: Automatically determines your current PlayStation level based on your trophy count inputs.
- Target Calculator: Input a desired level (Level 1-999) to see exactly how many points, specific trophies, or estimated games are required to reach it.
- Visual Analytics: Toggle between a Progress View and a Visual Distribution View (Donut Chart) to see your collection breakdown.
- Smart Presets: Quick-set buttons for "Next Milestone," "Next Rank," and "Max Level" (999).
- Progress Tracking: Visualizes progress towards the next immediate level and upcoming major rank thresholds (e.g., Bronze 3, Silver 1).
- Auto-Save: Uses LocalStorage to save your trophy counts and settings, so they persist even after closing the browser.

### 🧮 How It Works
Point System
The tool calculates total points based on the standard PlayStation trophy values:

<ins>Bronze</ins> = 15
<ins>Silver</ins> = 30
<ins>Gold</ins> = 90
<ins>Platinum</ins> = 300
### Level Logic
> Levels are calculated by accumulating points. The point requirement per level scales dynamically as you progress. The tool iteratively sums the cost of levels until it matches your total trophy points.

### Game Estimation
> The "Games needed" metric estimates that the average completed game yields approximately 1,350 points (roughly equivalent to 1 Platinum trophy plus a standard mix of Gold, Silver, and Bronze trophies).

### 🚀 Usage
1. Enter Trophy Counts: Input your current Bronze, Silver, Gold, and Platinum totals in the "Trophy Collection" section.
2. View Progress: The card below will automatically update your Level, Points, and progress percentage to the next level.
3. Flip the Card: Click the arrow icon on the "Current Progression" card to flip it and see a visual breakdown (Pie Chart) of your trophy rarity distribution.
4. Set a Target: Enter a level in the "Target Calculator" or use a preset button (e.g., Next Rank) to see how many more trophies you need to reach your goal.
