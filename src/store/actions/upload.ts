export const UPLOADFIRSTFILE = 'UPLOADFIRSTFILE'

export const uploadFirstFile = (uploadType, firstFile) => {
  return {  type: UPLOADFIRSTFILE, firstFile: firstFile, uploadType: uploadType }
}