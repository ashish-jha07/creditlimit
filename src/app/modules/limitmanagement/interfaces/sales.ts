
export interface SalesProjectionResponse {
    IsSucsess:  boolean;
    Message:    string;
    StatusCode: number;
    Response:   string[];
}

export interface SalesProjectionReq {
    Records: string;
}

export interface DownLoadSalesResponse  {
    IsSucsess:  boolean;
    Message:    string;
    StatusCode: number;
    Response:   string[];
}
export interface DownLoadSalesReq  {
    Region: string;
    StartDate:string;
    EndDate:string;
}