require('dotenv').config()
const { WebcastPushConnection } = require('tiktok-live-connector');

class ConnectionTiktok{
static komen;
connectTikTok() {
    console.log(process.env.USERNAME_LIVE)
    let tiktokLiveConnection = new WebcastPushConnection(process.env.USERNAME_LIVE);
    // Connect to the chat (await can be used as well)
    tiktokLiveConnection.connect().then(state => {
        console.info(`Connected to roomId ${state.roomId}`);
    }).catch(err => {
        console.error('Failed to connect', err);
    })

    tiktokLiveConnection.on('chat', data => {
        // console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
        console.log(`${data.comment}`);
        this.komen=data.comment
    })
    
    // And here we receive gifts sent to the streamer
    tiktokLiveConnection.on('gift', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
    })    
}

}

module.exports={
    ConnectionTiktok:ConnectionTiktok
}