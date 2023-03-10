import { useContext } from 'react';
import { RootStore } from './index';
import { StoreContext } from '../providers/StoreContext.provider';
import { SettingsStore } from './SettingsStore';

export const useRootStore = (): RootStore => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within StoreContextProvider');
  }
  return context;
};

export const useSettingsStore = (): SettingsStore => {
  const { settingsStore } = useRootStore();
  return settingsStore;
};
