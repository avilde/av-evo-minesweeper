export const isDebugMode = () => {
  return true;
};

export const _debug = (message?: any, ...optionalParams: any[]) => {
  return isDebugMode() ? console.info(message, ...optionalParams) : null;
};

export const mySignature = () => {
  console.info(
    `%c AV Mine Sweeper Game %c Author: Andris Vilde`,
    'background: #ff3b3b; color: #fff; font-size: 12px; border-radius: 3px 0 0 3px; font-family: Tahoma; padding: 0.25rem;',
    'background: #bb7272; color: #000; font-size: 12px; border-radius: 0 3px 3px 0; font-family: Tahoma; padding: 0.25rem;'
  );
};
