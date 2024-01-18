// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import store from './store';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: string, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
  invoke(channel: string, ...args: unknown[]) {
    return ipcRenderer.invoke(channel, ...args);
  },

  storeGet(key: string) {
    return ipcRenderer.sendSync('electron-store-get', key);
  },
  storeSet(key: string, val: any) {
    return ipcRenderer.send('electron-store-set', key, val);
  },
  exit() {
    return ipcRenderer.send('quit');
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
