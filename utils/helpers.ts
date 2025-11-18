import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

/**
 * Format date as YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Generate valid consecutive weekday leave dates (from + to)
 */
export function getValidLeaveDates(today: Date): { fromDate: string; toDate: string } {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const nextMonth = currentMonth + 1;

  const targetMonth = Math.random() > 0.5 ? currentMonth : nextMonth;

  const firstDay = new Date(currentYear, targetMonth, 1);
  const lastDay = new Date(currentYear, targetMonth + 1, 0);

  const validDates: Date[] = [];

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    const day = d.getDay(); // 0=Sunday, 6=Saturday
    if (day !== 0 && day !== 6) validDates.push(new Date(d));
  }

  if (validDates.length < 2) {
    throw new Error("Not enough valid weekdays found for this month.");
  }

  const startIndex = Math.floor(Math.random() * (validDates.length - 1));
  const fromDate = validDates[startIndex];
  const toDate = validDates[startIndex + 1];

  return {
    fromDate: formatDate(fromDate),
    toDate: formatDate(toDate)
  };
}

/**
 * Select user checkbox by name inside ag-grid table
 */
export async function selectUserCheckboxByName(page: Page, name: string) {
  const checkbox = page.locator(
    `//div[@class="ag-row"]//p[normalize-space(text())="${name}"]/ancestor::div[@class="ag-row"]//input[@type="checkbox"]`
  );
  await checkbox.check();
}

/**
 * Generate random date between two dates → YYYY-MM-DD
 */
export function getRandomDateInRange(start: Date, end: Date): string {
  let randomDate: Date;

  try {
    randomDate = faker.date.between({ from: start, to: end });
  } catch {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    randomDate = new Date(randomTime);
  }

  return formatDate(randomDate);
}

/**
 * Generate a random weekday (Mon–Fri) date between range
 */
export function getRandomWeekdayDate(start: Date, end: Date): string {
  while (true) {
    const dateStr = getRandomDateInRange(start, end);
    const dateObj = new Date(dateStr);
    const day = dateObj.getDay();
    if (day !== 0 && day !== 6) return dateStr;
  }
}
