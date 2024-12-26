export interface Seizure {

    key?: string | null;
    grpsName? : string;
    grpName? : string;
    details? : string;
    count? : string;
    typeofSeizure? : string;
    shortDetails? : string;
    dateofIncident? : string;
    dateofReport? : string;
    unique_id? : string;
}

export interface SeizureObject{
    seizure : Seizure[]
}
