export const DISPATCHSENDBARRAGE = 'DISPATCH_SEND_BARRAGE'

export const STOREBARRAGES = 'STORE_BARRAGES'

export const PUSHBARRAGE = 'PUSHBARRAGE'

export const dispatchSendBarrage = (content: string) => {
    return { type: DISPATCHSENDBARRAGE, content }
}

export const storeBarrages = (barrages) => {
    return { type: STOREBARRAGES, barrages }
}

export const pushBarrage = (barrage) => {
    return { type: PUSHBARRAGE, barrage }
}