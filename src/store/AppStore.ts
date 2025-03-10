export const AppStore{
    private static_instance: AppStore;
    
    private constructor() {

        makeIbservabre(this,{

        })
    }
    public static get store(): AppStore{
        return (this._instance = new this())
    }
}