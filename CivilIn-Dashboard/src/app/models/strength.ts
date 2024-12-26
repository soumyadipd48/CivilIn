export class Strength {

    key?: string | null;
    date? : string;
    grpname? : string;
    total? : string;
    inspr? : string = '-';
    silsi? : string = '-';
    strengthDesc? : string;
    hg? : string = '-';
    nvf? : string = '-';
    asilasi? : string = '-';
    asimt? : string = '-';
    lc? : string = '-';
    civic? : string = '-';
    const? : string = '-';
    document_id? : string = '-';
    lstUpdatedBy? : string = '';
    unique_id? : string = '';
}

export interface StrengthObject{
    strength : Strength[]
}
