export const ApiErrorResponse = (message: string = 'Something went wrong!') => ({
    success: false,
    message: message
})

export const ApiSuccessResponse = (data: any = {}, message: string = 'Success') => ({
    success: true,
    data: data,
    message: message
})