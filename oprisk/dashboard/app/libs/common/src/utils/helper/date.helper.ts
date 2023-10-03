import * as moment from 'moment';

export class DateHelper {
    static convertISOStringFormat(
        value: Date,
        format = 'YYYY-MM-DD H:mm:ss',
    ): any {
        // const d = moment.locale('id')
        // return moment(1316116057189).fromNow();
        return moment(value).format(format);
    }

    static convertStringToDate(str) {
        return moment(str, 'YYYY-MM-DD H:mm:ss').toDate();
    }
}
