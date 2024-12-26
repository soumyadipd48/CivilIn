export class UdCase {

    key?: string | null;
    grpsname? : string;
    grpName? : string;
    udcaseNo? : string;
    po? : string;
    age? : string;
    sex? : string;
    dateofIncident? : string;
    dateofReport? : string;
    gistOfTheCase? : string;
    nameOfDeceased? : string;
    unique_id? : string;
}

export interface UDCaseObject{
    udCase : UdCase[]
}
