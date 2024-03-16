

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.0Jz4naMg.js","_app/immutable/chunks/scheduler.8WOK2LBS.js","_app/immutable/chunks/index.e9SNGN7K.js","_app/immutable/chunks/entry.R4m129Rm.js"];
export const stylesheets = [];
export const fonts = [];
