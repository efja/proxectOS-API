import { MODELS_PATHS } from './models-paths.helper';

export async function createClassFromName(name: string) {
    var ns = await import(`../models/${MODELS_PATHS[name]}`);

    return new ns[name]();
}
