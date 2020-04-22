export const isDebugMode = () => {
  return true;
}

export const debug = (message?: any, ...optionalParams: any[]) => {
  return isDebugMode() ? console.info(message, ...optionalParams) : null;
};
