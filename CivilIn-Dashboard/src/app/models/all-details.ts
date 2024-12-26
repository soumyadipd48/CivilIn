export class AllDetails {

    key?: string | null;
	grp? : string = 'NA';
	grps? : string = 'NA';
    udgrps? : string = 'NA';
    dateofReport? : string;
    specCountToday? : string = '0';
	prevCountToday? : string = '0';
	totalArrestCountToday? : string = '0';
	udcountToday? : string = '0';
	seizureCountToday? : string = '0';
	fircountToday? : string = '0';
	otherCasesToday? : string = '0';
	totalCasesCountToday? : string = '0';
	typeOfCrime? : string = 'NA';
	lstUpdatedBy? : string = '';
	document_id? : string = '';
	unique_id? : string = '';
}

export interface AllDetailsObject{
    allDetails : AllDetails[]
}
