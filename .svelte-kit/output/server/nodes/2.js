

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.q_Qr8TrJ.js","_app/immutable/chunks/scheduler.8WOK2LBS.js","_app/immutable/chunks/index.e9SNGN7K.js"];
export const stylesheets = ["_app/immutable/assets/2.R_vFEUqf.css"];
export const fonts = [];
