import Route from "../app/Services/Route";

export const path = (name: string): string | undefined => {
    return Route.path(name);
};

export const route = (name: string, ...args: (string | number)[]): string => {
    return Route.get(name, ...args) ?? "";
};
