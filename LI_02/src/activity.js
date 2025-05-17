export async function getRandomActivity() {
    try {
      const response = await fetch("https://random-word-api.vercel.app/api?words=1");
      if (!response.ok) {
        throw new Error(`Ошибка API: ${response.status}`);
      }
  
      const data = await response.json();
      return `Займитесь: ${data[0]}`;
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
      return "Не удалось загрузить занятие. Попробуйте позже.";
    }
  }
  