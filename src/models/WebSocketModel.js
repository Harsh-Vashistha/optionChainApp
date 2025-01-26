class WebSocketModel {
    constructor(url, msg) {
        this.url = url;
        this.socket = null;
        this.data = {
            msg: msg,
        };
    }

    connect(onMessage, onError, onClose) {
        try {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                console.log('WebSocket Connected');
                this.sendMessage(this.data);
            };

            this.socket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (onMessage) {
                        onMessage(data);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                    if (onError) onError(error);
                }
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
                if (onError) onError(error);
            };

            this.socket.onclose = (event) => {
                console.log('WebSocket Closed');
                if (onClose) onClose(event);
            };
        } catch (error) {
            console.error('WebSocket Connection Error:', error);
            if (onError) onError(error);
        }
    }

    sendMessage(message) {
        console.log('sendMessage', message);
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            try {
                this.socket.send(JSON.stringify(message));
            } catch (error) {
                console.error('Error sending message:', error);
            }
        } else {
            console.warn('WebSocket is not open. Unable to send message.');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }
}

export default WebSocketModel; 