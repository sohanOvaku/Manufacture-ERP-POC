export interface ApiResponse<T> {
    payload: T,
    status: number,
    message: string
}