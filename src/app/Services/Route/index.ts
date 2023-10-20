class Route {
    private static _list: Route[] = [];
    private _path: string;
    private _name: string | null = null;

    constructor(path: string) {
        this._path = path;
    }

    public name(name: string): Route {
        this._name = name;

        return this;
    }

    public static add(path: string): Route {
        const route = new Route(path);

        this._list.push(route);

        return route;
    }

    public static path(name: string): string | undefined {
        return this._list.find((route) => route._name === name)?._path;
    }

    public static get(name: string, ...args: any[]): string | undefined {
        const route = this._list.find((route) => route._name === name);

        if (!route) {
            return undefined;
        }

        let result = route._path;

        for (let i in args) {
            result = result.replace(/:[a-zA-Z0-9]{1,}/, args[i]);
        }

        return result;
    }
}

export default Route;
