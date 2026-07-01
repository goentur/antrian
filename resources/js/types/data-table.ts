
export interface InfoDataTabel {
    page: number | 1,
    from: number | 0,
    to: number | 0,
    total: number | 0,
    perPage: number | 25,
    search?: string | null,
}

export interface LinkPagination {
    label: string
    url: string | null
    active: boolean
}