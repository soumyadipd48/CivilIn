export class PreventiveArrest {

    key?: string | null;
    grpname? : string = '-';
    act1? : string = '-';
    act2? : string = '-';
    act3? : string = '-';
    act4? : string = '-';
    policeAct? : string = '-';
    act5? : string = '-';
    bclaact? : string = '-';
    iract? : string = '-';
    other? : string = '-';
    total? : string = '-';
    dateofIncident? : string = '-';
    dateofReport? : string;
    lstUpdatedBy? : string = '';
    document_id? : string = '';
    unique_id? : string;
}

export interface PreventiveArrestObject{
    preventiveArrest : PreventiveArrest[]
}
