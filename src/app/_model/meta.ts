export interface MetaData {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    first_page: number;
    first_page_url: string | null;
    last_page_url: string | null;
    next_page_url: string | null;
    previous_page_url: string | null;
}