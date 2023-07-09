class GlobalStore {
    store: any = {};

    public loadFromSession() {
        let value = localStorage.getItem("referral_user");
        if (!value) {
            return null;
        }
        this.setStore(JSON.parse(value));
        return JSON.parse(value);
    }

    public getStore() {
        return this.store;
    }

    public setStore(_store: any,) {
        this.store = { ...this.store, ..._store };
        this.storeInSession(this.store);
    }

    public storeInSession(value: any = {}) {
        localStorage.setItem("referral_user", JSON.stringify(value));
    }

    public clearStorage = () => {
        localStorage.removeItem("referral_user");
        this.store = {};
    }
}

export default new GlobalStore();