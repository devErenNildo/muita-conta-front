export type PaginatedResponse<T> = {
    content: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
};