export type Job = {
	id?: string;
	company: string;
	company_logo: string;
	description: string;
	location: string;
	title: string;
	type: string;
	created_at: string;
	how_to_apply: string;
};

export type Jobs = Job[];

export type JobState = {
	jobs?: Jobs;
	isLoading?: boolean;
	error?: string;
	hasNextPage?: boolean;
};

export type ChangeParams = (
	event: React.ChangeEvent<
		HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
	>
) => void;

export type SearchEvent = (event: React.FormEvent<HTMLFormElement>) => void;

export type SearchCriteria = {
	description?: string;
	location?: string;
	lat?: string;
	long?: string;
	full_time?: string;
};

export interface SearchJobProps {
	params: SearchCriteria;
	onChangeParams: ChangeParams;
	onSearch: SearchEvent;
}
