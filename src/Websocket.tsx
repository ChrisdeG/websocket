import { Component, ReactNode, createElement } from "react";
import { WebsocketContainerProps } from "../typings/WebsocketProps";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {} from "mendix";
import Big from "big.js";

declare global {
    interface Window {
        mx: any;
    }
}

export default class WebSocket extends Component<WebsocketContainerProps> {
    private readonly sendKeepAliveHandler = this.sendKeepAlive.bind(this);

    client: W3CWebSocket;
    subscribed: boolean;
    intervalId: NodeJS.Timeout | undefined;

    constructor(props: any) {
        super(props);
        this.subscribed = false;
        // for local development use ws, in the cloud wss
        const protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
        this.client = new W3CWebSocket(protocol + window.location.host + "/" + this.props.path);
    }

    // send every 15 seconds a keepalive, otherwise the websocket will be closed after 30 seconds
    sendKeepAlive() {
        if (this.subscribed && this.client.readyState === this.client.OPEN) {
            this.client.send("keepalive:" + this.props.subscriptionAttribute.displayValue);
        }
    }

    updateProperties(data: any) {
        if (this.props.progressAttribute && data.progress) {
            this.props.progressAttribute.setValue(Big(Number(data.progress)));
        }
        if (this.props.text1Attribute && data.text1) {
            this.props.text1Attribute.setValue(data.text1);
        }
        if (this.props.text2Attribute && data.text2) {
            this.props.text2Attribute.setValue(data.text2);
        }
        if (this.props.text3Attribute && data.text3) {
            this.props.text3Attribute.setValue(data.text3);
        }
        if (this.props.decimalAttribute && data.value) {
            this.props.decimalAttribute.setValue(Big(Number(data.value)));
        }
        if (this.props.dateAttribute && data.datetime) {
            this.props.dateAttribute.setValue(new Date(Number(data.datetime)));
        }
        if (this.props.booleanAttribute) {
            this.props.booleanAttribute.setValue(data.busy === "true");
        }
    }

    // called from various places because the timing of rendering or websocket connections differs per browser.
    subscribe(): void {
        if (
            !this.subscribed &&
            this.client.readyState === this.client.OPEN &&
            this.props.subscriptionAttribute.status === "available"
        ) {
            console.debug("websocket subscribe", this.props.subscriptionAttribute.displayValue);
            const csrfToken = window.mx && window.mx.session ? window.mx.session.getConfig("csrftoken") : "";
            this.client.send("subscribe:" + this.props.subscriptionAttribute.displayValue + "," + csrfToken);
            this.subscribed = true;
        }
    }

    componentDidMount(): void {
        this.client.onopen = () => {
            this.intervalId = setInterval(this.sendKeepAliveHandler, 15000);
            if (!this.subscribed) {
                this.subscribe();
            }
        };
        this.client.onmessage = (message: any) => {
            if (message && message.data) {
                const data = JSON.parse(message.data);
                this.updateProperties(data);
                if (this.props.onUpdateAction && this.props.onUpdateAction.canExecute) {
                    this.props.onUpdateAction.execute();
                }
            } else {
                console.error("websocket message received without data", message);
            }
        };
        this.client.onclose = () => {
            console.debug("websocket unsubscribe", this.props.subscriptionAttribute.displayValue);
            this.subscribed = false;
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        };
    }

    componentWillUnmount() {
        if (this.client) {
            this.client.close();
        }
    }

    render(): ReactNode {
        if (!this.subscribed) {
            this.subscribe();
        }
        return <div></div>;
    }
}
