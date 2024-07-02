export const config = {
  nodeEnv: import.meta.env.VITE_APP_NODE_ENV as string,
  backendProd: import.meta.env.VITE_APP_BACKEND_PROD as string,
  backendDev: import.meta.env.VITE_APP_BACKEND_DEV as string,
};
