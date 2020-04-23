export const isDebugMode = () => {
  return true;
};

export const _debug = (message?: any, ...optionalParams: any[]) => {
  return isDebugMode() ? console.info(message, ...optionalParams) : null;
};

export const mySignature = () => {
  console.info(
    `%c AV Mine Sweeper Game %c Author: Andris Vilde`,
    'background: #ff3b3b; color: #fff; font-size: 0.75rem; border-radius: 0.25rem 0 0 0.25rem; font-family: Tahoma; padding: 0.25rem;',
    'background: #fff; color: #000; font-size: 0.75rem; border-radius: 0 0.25rem 0.25rem 0; font-family: Tahoma; padding: 0.25rem;'
  );
};
