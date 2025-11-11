
import { Page } from '@playwright/test';

export function getValidLeaveDate(today: Date): string {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const nextMonth = currentMonth + 1;

  // Randomly choose whether to use current or next month
  const targetMonth = Math.random() > 0.5 ? currentMonth : nextMonth;

  // Start from the 1st of target month
  const firstDay = new Date(currentYear, targetMonth, 1);
  const lastDay = new Date(currentYear, targetMonth + 1, 0);

  const validDates: Date[] = [];

  // Collect all weekdays within range
  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const day = d.getDay(); // 0=Sunday, 6=Saturday
    if (day !== 0 && day !== 6) {
      validDates.push(new Date(d));
    }
  }

  if (validDates.length === 0) {
    throw new Error('❌ No valid weekdays found for this month.');
  }

  // Pick a random valid weekday
  const randomDate = validDates[Math.floor(Math.random() * validDates.length)];

  // Convert to yyyy-mm-dd (HTML date input format)
  const yyyy = randomDate.getFullYear();
  const mm = String(randomDate.getMonth() + 1).padStart(2, '0');
  const dd = String(randomDate.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;

  
}

export async function selectUserCheckboxByName(page: Page, name: string) {
  const checkbox = page.locator(
    `//div[@class="ag-row"]//p[normalize-space(text())="${name}"]/ancestor::div[@class="ag-row"]//input[@type="checkbox"]`
  );
  await checkbox.check();
}

