import { WebSocketType } from '@config'
interface options {
  type: string,
  tunnelId: string,
  haiyouId?: number
}
interface MessageType {
  action: string,
  payload: {
    content: string,
    date: string,
    uid?: string
  }
}

enum Action {
  SENDMESSAGE = 'sendMessage',
  SENDBARRAGE = 'sendBarrage',
  RECEIVEMESSAGE = 'receiveMessage',
  RECEIVEBARRAGE = 'receiveBarrage'
}

export class Websocket {
  ws: WebSocket
  pendingMessagesArray: Array<string>
  constructor(opts: options) {
    this.pendingMessagesArray = new Array<string>()
    switch(opts.type) {
      case WebSocketType.CHAT:
        this.ws = new WebSocket(`ws:129.28.153.58:10011/${opts.type}/${opts.tunnelId}`)
        break
      case WebSocketType.HAIYOU:
        this.ws = new WebSocket(`ws:129.28.153.58:10011/${opts.type}/${opts.haiyouId}/${opts.tunnelId}`)
        break
      default:
        break
    }
  }

  public getWs() {
    return this.ws
  }
  
  public sendMessage(message: MessageType) {
    if(this.ws.readyState == 1) {    
      this.ws.send(JSON.stringify(message))
    } else {
      this.pendingMessagesArray.push(JSON.stringify(message))
    }
  }
  
  dealPendingMessages() {
    this.pendingMessagesArray.forEach((value) => {
      this.ws.send(value)
    })
  }

  openCallBack() {
    this.ws.onopen = (msg) => {
      console.log(msg)
      this.dealPendingMessages()
    }
  }

  close() {
    this.ws.close()
  }

  public acceptMessage() {
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      switch(msg.action){
        case 'id':
          console.log(msg)
          break
        case Action.RECEIVEMESSAGE:
          break
      }
    }
  }
}
