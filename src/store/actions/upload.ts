export const UPLOADFIRSTFILE = 'UPLOADFIRSTFILE'

export const uploadFirstFile = (firstFile) => {
  return {  type: UPLOADFIRSTFILE, file: firstFile }
}