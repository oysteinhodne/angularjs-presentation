module eco {
    export interface IEchonestProvider {
        apiUrl:string
        apiKey:string
    }
    export interface IEchonestService extends IEchonestProvider{
        findArtist:any
    }
}