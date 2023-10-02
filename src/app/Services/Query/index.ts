class Query {
    public static parseToURI(params: any | null): string | null {
        if (!params) {
            return null;
        }

        let result: string[] = [];

        for (let key in params) {
            if (Array.isArray(params[key])) {
                for (let item of params[key]) {
                    result.push(key + "=" + item);
                }
            }

            result.push(key + "=" + params[key]);
        }

        return "?" + result.join("&");
    }
}

export default Query;
