import { useState, useEffect } from 'react';
import { fetchModules, updateModule } from '../api/settingsApi'; // fiktive API-Funktionen

export function useModules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchModules();
      setModules(data);
    }
    load();
  }, []);

  async function enableModule(name) {
    const updated = await updateModule(name, { enabled: true });
    setModules(prev => prev.map(m => m.name === name ? updated : m));
  }

  async function disableModule(name) {
    const updated = await updateModule(name, { enabled: false });
    setModules(prev => prev.map(m => m.name === name ? updated : m));
  }

  return { modules, enableModule, disableModule };
}
