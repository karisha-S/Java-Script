import { getRandomActivity } from "./activity.js";

async function showActivity() {
  const activityElement = document.getElementById("activity");
  activityElement.textContent = await getRandomActivity();
}

showActivity();
