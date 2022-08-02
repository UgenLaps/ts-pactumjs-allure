export function CreateAPIAttachmentReq(data: object ): string {
    const agg = {
        url: data['url'],
        method: data['method'],
        body: data['body']
    }

    return JSON.stringify(agg, null, 4);
}

export function CreateAPIAttachmentRes(data: object ): string {
    const agg = {
        headers: data['headers'],
        statusCode: data['statusCode'],
        body: data['body']
    }

    return JSON.stringify(agg, null, 4);
}