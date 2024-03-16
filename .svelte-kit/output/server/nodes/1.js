

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.YmROPtPd.js","_app/immutable/chunks/scheduler.8WOK2LBS.js","_app/immutable/chunks/index.e9SNGN7K.js","_app/immutable/chunks/entry.lmSYEKsH.js"];
export const stylesheets = [];
export const fonts = [];
