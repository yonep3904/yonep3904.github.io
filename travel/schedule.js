document.addEventListener('DOMContentLoaded', function() {
  // 現在時刻を取得
  const now = new Date();

  // 日付ごとの基準日
  const dayMap = {
    day1: '2025-09-16',
    day2: '2025-09-17',
    day3: '2025-09-18',
  };

  // 各日付セクションを処理
  Object.entries(dayMap).forEach(([id, dateStr]) => {
    const section = document.getElementById(id);
    if (!section) return;
    const items = section.querySelectorAll('.item');
    items.forEach(item => {
      const timeDiv = item.querySelector('.time');
      if (!timeDiv) return;
      let timeText = timeDiv.textContent.trim();
      // "翌"や範囲表記の処理
      let baseDate = dateStr;
      if (timeText.startsWith('翌')) {
        baseDate = new Date(new Date(dateStr).getTime() + 24*60*60*1000);
        baseDate = baseDate.toISOString().slice(0,10);
        timeText = timeText.replace('翌','').trim();
      }
      let hour = 0, min = 0;
      if (/\d{1,2}:\d{2}/.test(timeText)) {
        [hour, min] = timeText.match(/\d{1,2}/g).map(Number);
      } else if (/\d{1,2}–\d{1,2}:\d{2}/.test(timeText)) {
        // 範囲（例: 11:00–12:30）は開始時刻で判定
        [hour, min] = timeText.match(/\d{1,2}/g).slice(0,2).map(Number);
      } else {
        return;
      }
      const eventDate = new Date(`${baseDate}T${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}:00`);
      if (eventDate < now) {
        item.classList.add('past');
      } else {
        item.classList.add('future');
      }
    });
  });
});
