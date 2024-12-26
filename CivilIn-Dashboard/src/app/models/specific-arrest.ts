export class SpecificArrest {

    key?: string | null;
    grpsName? : string;
    grpName? : string;
    details? : string;
    count? : string;
    shortDetails? : string;
    dateofIncident? : string;
    dateofReport? : string;
    unique_id? : string;
}

export interface SpecificArrestObject{
    specificArrest : SpecificArrest[]
}
