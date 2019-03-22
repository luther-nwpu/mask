export const UPLOADFIRSTFILE = 'UPLOADFIRSTFILE'

export const uploadFirstFile = (firstFile, uploadType) => {
  return {  type: UPLOADFIRSTFILE, firstFile: firstFile, uploadType: uploadType }
}