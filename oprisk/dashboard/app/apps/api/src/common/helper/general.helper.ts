// noinspection JSUnusedGlobalSymbols

import { PreviousPeriodStructure } from '../constants/general.constant';
import * as moment from 'moment';
import { ActiveStatusEnum } from '../enums/active_status.enum';

export const GetPreviousPeriod = (date?: Date): PreviousPeriodStructure => {
    const newDate = (date) => date.setMonth(date.getMonth() - 1);
    if (date) {
        date = newDate(date);
    } else {
        const currentDate = new Date();
        date = newDate(currentDate);
    }

    const prevDate = new Date(date);
    const year = prevDate.getFullYear();
    const month = prevDate.getMonth() + 1;

    return {
        year,
        month,
    };
};

export const YearsDiff = (date1: any, date2: any): number => {
    if (!(date1 instanceof Date)) {
        date1 = new Date(date1);
    }

    if (!(date2 instanceof Date)) {
        date2 = new Date(date2);
    }

    return date2.getFullYear() - date1.getFullYear();
};

export const MonthsDiff = (date1, date2): number => {
    if (!(date1 instanceof Date)) {
        date1 = new Date(date1);
    }

    if (!(date2 instanceof Date)) {
        date2 = new Date(date2);
    }
    const years = YearsDiff(date1, date2);
    // console.log(date1, date2, years, months);

    return years * 12 + (date2.getMonth() - date1.getMonth());
};

/**
 *
 * @param date
 * @returns start = saturday | end = friday
 */
export const GetWeekPeriod = (date?) => {
    if (date && !(date instanceof Date)) {
        date = new Date(date);
    } else {
        date = new Date();
    }

    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    let substract;
    const dayName = days[date.getDay()];
    if (dayName == 'saturday') {
        substract = 1;
    } else {
        substract = days.indexOf(dayName) + 2;
    }
    // console.log(date, dayName, substract);

    const substractDate = (d, days) => {
        d.setDate(d.getDate() - days);
        return d;
    };
    const friday = substractDate(date, substract);
    // get a week before from friday date
    const saturday = substractDate(new Date(friday), 6);

    const start = onlyDate(saturday);
    const end = onlyDate(friday);
    // console.log(start, end);

    return {
        start,
        end,
    };
};

const onlyDate = (d) => {
    return (
        d.getFullYear() +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + d.getDate()).slice(-2)
    );
};

export const GetLastDateOfMonth = (
    prevPeriod?: PreviousPeriodStructure,
    asString = true,
) => {
    if (!prevPeriod) {
        prevPeriod = GetPreviousPeriod();
    }

    const d =
        prevPeriod.year + '-' + ('0' + prevPeriod.month).slice(-2) + '-01';
    const date = new Date(d);

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let result;
    if (asString) {
        result = onlyDate(lastDay);
    } else {
        result = lastDay;
    }

    return result;
};

export const FormattedDate = (date: Date) => {
    return moment(date).format('YYYY-MM-DD');
};

export const FormattedDateTime = (date: any) => {
    if (date == '' || date == undefined) {
        return null;
    }

    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

/**
 * @param date ex: 20230531
 * @returns ex 2023-05-31
 */
export const SrcDateSuffixToDateString = (date: string) => {
    if (date.length != 8) return null;

    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);

    return year + '-' + month + '-' + day;
};

export const GetWeekNumberByDate = (date?: Date): number => {
    if (!date) {
        date = new Date();
    }

    const year = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor(
        Math.abs(date.getTime() - year.getTime()) / (24 * 60 * 60 * 1000),
    );

    return Math.ceil(days / 7);
};

export function convertToIndonesianNumber(number: number): string {
    if (number == null) {
        return ''; // or any default value you prefer
    }
    return number.toLocaleString('id-ID');
}

export function ToActiveStatusHelper(
    value: ActiveStatusEnum | boolean,
): ActiveStatusEnum {
    if (value === true) {
        return ActiveStatusEnum.ACTIVE;
    } else if (value === false) {
        return ActiveStatusEnum.INACTIVE;
    }
    return value;
}

export function IsValidDateRange(startDate: Date, endDate: Date): boolean {
    return startDate < endDate;
}
