/**
 * This file was generated from Websocket.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";

export interface WebsocketContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    subscriptionAttribute: EditableValue<string>;
    progressAttribute?: EditableValue<BigJs.Big>;
    text1Attribute?: EditableValue<string>;
    text2Attribute?: EditableValue<string>;
    text3Attribute?: EditableValue<string>;
    booleanAttribute?: EditableValue<boolean>;
    decimalAttribute?: EditableValue<BigJs.Big>;
    dateAttribute?: EditableValue<Date>;
    onUpdateAction?: ActionValue;
    path: string;
}

export interface WebsocketPreviewProps {
    class: string;
    style: string;
    subscriptionAttribute: string;
    progressAttribute: string;
    text1Attribute: string;
    text2Attribute: string;
    text3Attribute: string;
    booleanAttribute: string;
    decimalAttribute: string;
    dateAttribute: string;
    onUpdateAction: {} | null;
    path: string;
}
