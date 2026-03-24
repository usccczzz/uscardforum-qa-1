const DEFAULTS = {
  provider: 'gemini',
  apiKey: '',
  model: 'gemini-3.1-pro-preview',
  baseUrl: '',
  thinking: true,
};

export function loadSettings() {
  return {
    provider: GM_getValue('provider', DEFAULTS.provider),
    apiKey: GM_getValue('apiKey', DEFAULTS.apiKey),
    model: GM_getValue('model', DEFAULTS.model),
    baseUrl: GM_getValue('baseUrl', DEFAULTS.baseUrl),
    thinking: GM_getValue('thinking', DEFAULTS.thinking),
  };
}

export function saveSettings({ provider, apiKey, model, baseUrl, thinking }) {
  if (provider !== undefined) GM_setValue('provider', provider);
  if (apiKey !== undefined) GM_setValue('apiKey', apiKey);
  if (model !== undefined) GM_setValue('model', model);
  if (baseUrl !== undefined) GM_setValue('baseUrl', baseUrl);
  if (thinking !== undefined) GM_setValue('thinking', thinking);
}
