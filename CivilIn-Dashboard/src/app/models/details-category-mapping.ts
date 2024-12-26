export class DetailsCategoryMapping {

    key?: string | null;
    grpname? : string;
    date? : string;
    document_id? : string = '';
	unique_id? : string = '';
	category? : string = '';
	detailsAllUnId? : string = '';
	categoryunId? : string = '';
}

export interface DetailsCategoryMappingObject{
    detailsCategoryMapping : DetailsCategoryMapping[]
}
