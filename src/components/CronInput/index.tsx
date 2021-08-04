import { Cron, Locale } from 'react-js-cron'
import { CronProps } from 'react-js-cron/src/types'
import { LanguageID } from '@/i18n'

export type CronInputProps = Omit<CronProps, 'locale'> & {
  lang: LanguageID
}

const locales: Record<LanguageID, Locale> = {
  zh: {
    everyText: '每',
    emptyMonths: '每月',
    emptyMonthDays: '每天',
    emptyMonthDaysShort: '每天',
    emptyWeekDays: '暂不考虑周几',
    emptyWeekDaysShort: '暂不考虑周几',
    emptyHours: '每',
    emptyMinutes: '分钟',
    emptyMinutesForHourPeriod: '每',
    yearOption: '年',
    monthOption: '月',
    weekOption: '周',
    dayOption: '天',
    hourOption: '时',
    minuteOption: '分',
    rebootOption: '重启',
    prefixPeriod: '每',
    prefixMonths: '的',
    prefixMonthDays: '的',
    prefixWeekDays: '的',
    prefixWeekDaysForMonthAndYearPeriod: '和',
    prefixHours: '的',
    prefixMinutes: '小时的每个',
    prefixMinutesForHourPeriod: '个小时的每个',
    suffixMinutesForHourPeriod: '分',
    errorInvalidCron: '错误的设定',
    clearButtonText: '清除',
    weekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    altWeekDays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    altMonths: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
  },
  en: {
    everyText: 'every',
    emptyMonths: 'every month',
    emptyMonthDays: 'every day of the month',
    emptyMonthDaysShort: 'day of the month',
    emptyWeekDays: 'every day of the week',
    emptyWeekDaysShort: 'day of the week',
    emptyHours: 'every hour',
    emptyMinutes: 'every minute',
    emptyMinutesForHourPeriod: 'every',
    yearOption: 'year',
    monthOption: 'month',
    weekOption: 'week',
    dayOption: 'day',
    hourOption: 'hour',
    minuteOption: 'minute',
    rebootOption: 'reboot',
    prefixPeriod: 'Every',
    prefixMonths: 'in',
    prefixMonthDays: 'on',
    prefixWeekDays: 'on',
    prefixWeekDaysForMonthAndYearPeriod: 'and',
    prefixHours: 'at',
    prefixMinutes: ':',
    prefixMinutesForHourPeriod: 'at',
    suffixMinutesForHourPeriod: 'minute(s)',
    errorInvalidCron: 'Invalid cron expression',
    clearButtonText: 'Clear',
    weekDays: [
      // Order is important, the index will be used as value
      'Sunday', // Sunday must always be first, it's "0"
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    months: [
      // Order is important, the index will be used as value
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    // Order is important, the index will be used as value
    altWeekDays: [
      'SUN', // Sunday must always be first, it's "0"
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ],
    // Order is important, the index will be used as value
    altMonths: [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ],
  },
}

export default function CronInput({ lang, ...props }: CronInputProps) {
  return <Cron {...props} locale={locales[lang]} />
}
