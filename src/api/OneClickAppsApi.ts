import { useEffect, useState } from 'react'
import { IOneClickAppIdentifier, IOneClickTemplate } from "../models/IOneClickAppModels";
import Toaster from "../utils/Toaster";

const BASE_URL = "https://oneclickapps.caprover.com/v2";

export const getOneClickApp = (name: string): Promise<IOneClickTemplate> => fetch(`${BASE_URL}/apps/${name}.json`).then(response => response.json())

export const useOneClickAppList = (): [string[] | undefined, (filter: string) => void] => {
  const [filter, setFilter] = useState<string>("");
  const [apps, setApps] = useState<string[]>();

  useEffect(() => {
    fetch(`${BASE_URL}/autoGeneratedList.json`)
      .then(response => response.json())
      .then((data: { appList: string[] }) => setApps(data.appList.sort()))
      .catch(Toaster.createCatcher());
  }, []);

  if (!apps || !filter) return [apps, setFilter];
  return [apps.filter(name => name.includes(filter)), setFilter];
};

export const useOneClickApp = (name: string): IOneClickTemplate | undefined => {
  const [app, setApp] = useState<IOneClickTemplate>();

  useEffect(() => {
    getOneClickApp(name).then(setApp);
  }, [name]);

  return app;
};
