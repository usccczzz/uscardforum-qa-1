const DEFAULTS = {
  apiKey: 'REDACTED_API_KEY',
  model: 'gemini-3.1-pro-preview',
};

export function loadSettings() {
  return {
    apiKey: GM_getValue('apiKey', DEFAULTS.apiKey),
    model: GM_getValue('model', DEFAULTS.model),
  };
}

export function saveSettings({ apiKey, model }) {
  if (apiKey !== undefined) GM_setValue('apiKey', apiKey);
  if (model !== undefined) GM_setValue('model', model);
}
