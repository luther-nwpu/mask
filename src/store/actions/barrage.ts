export const DISPATCHSENDBARRAGE = 'SEND_BARRAGE'

export const STOREBARRAGES = 'STORE_BARRAGES'

export const dispatchSendBarrage = (content: string) => {
    return { type: DISPATCHSENDBARRAGE, content }
}

export const storeBarrages = (barrages) => {
    return { type: STOREBARRAGES, barrages }
}