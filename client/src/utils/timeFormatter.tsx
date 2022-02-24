import { format, formatDuration, parseISO } from 'date-fns';
import add from 'date-fns/add'

function formatDateRange(startTimestamp: string | null, days: number) {
  if (!startTimestamp) {
    return formatDuration({ days: days })
  }
  const startDate = new Date(startTimestamp)
  const day = add(startDate, { days: days - 1 })
  return `${format(startDate, 'L/d/Y')} - ${format(day, 'L/d/Y')}`
}

function formatDate(startDate: Date | string | null, i: number) {
  if (!startDate) {
    return `Day ${i + 1}`;
  }
  if (typeof startDate === 'string') {
    startDate = new Date(startDate)
  }
  const day = add(startDate, { days: i })
  return format(day, 'E, MMM d')
}

function formatTimeRange(startDate: Date | string, endDate: Date | string) {
  if (!startDate) {
    return '';
  }
  if (typeof startDate === 'string') {
    startDate = parseISO(startDate)
  }
  const start = format(startDate, 'HH:mm');
  let end = '';
  if (endDate) {
    if (typeof endDate === 'string') {
      endDate = parseISO(endDate)
    }
    end = ' - ' + format(endDate, 'HH:mm');
  }
  return start + end;
}

export { formatDateRange, formatDate, formatTimeRange };