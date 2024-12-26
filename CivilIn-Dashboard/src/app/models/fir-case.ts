export interface FirCase {

    key?: string | null;
    grpsName? : string;
    grpName? : string;
    details? : string;
    count? : string;
    ifZeroFIR? : boolean;
    typeofSeizure? : string;
    shortDetails? : string;
    dateofIncident? : string;
    dateofReport? : string;
    detailsHead? : string;
    unique_id? : string;
}

export interface FirCaseObject{
    firCase : FirCase[]
}
