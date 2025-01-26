import WebSocketModel from '../models/WebSocketModel';

class WebSocketController {
    constructor(serverUrl, msg, onDataUpdate, onError) {
        this.model = new WebSocketModel(serverUrl, msg);
        this.onDataUpdate = onDataUpdate; // Callback to pass new data to the View
        this.isInitialized = false;
        this.onError = onError; // Callback to handle errors
    }

    initialize() {
        if (!this.isInitialized) {
            this.model.connect(
                (data) => {
                    if (data && data.ltp) {
                        this.onDataUpdate(data.ltp); // Pass new data to the View
                    }
                },
                (error) => {
                    // if (this.onError) this.onError(error); // Pass errors to the View
                },
                (closeEvent) => {
                    console.log('WebSocket connection closed');
                }
            );
            this.isInitialized = true;
        }
    }

    updateMessage(message) {
        this.model.sendMessage({
            msg: message,
        }); // Send updated message
    }

    destroy() {
        if (this.isInitialized) {
            this.model.disconnect();
            this.isInitialized = false;
        }
    }
}

export default WebSocketController; 