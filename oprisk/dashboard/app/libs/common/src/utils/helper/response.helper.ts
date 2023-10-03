export type SummaryResponseType = {
    type : string,
    name : string,
    completed : number,
    total : number,
    percentage: number
}

export const SummaryResponse = (data : any , type : string) => {
    const response = [];

    data.forEach(element => {
       
        const responseItem : SummaryResponseType = {
            type: type,
            name : element.name,
            completed : element.completed,
            total : element.total,
            percentage : element.percentage,
        }
        response.push(responseItem); 
    });
    return response;
}
