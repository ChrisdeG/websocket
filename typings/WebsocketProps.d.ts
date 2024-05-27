/**
 * This file was generated from Websocket.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface WebsocketContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    subscriptionAttribute: EditableValue<string>;
    progressAttribute?: EditableValue<Big>;
    text1Attribute?: EditableValue<string>;
    text2Attribute?: EditableValue<string>;
    text3Attribute?: EditableValue<string>;
    booleanAttribute?: EditableValue<boolean>;
    decimalAttribute?: EditableValue<Big>;
    dateAttribute?: EditableValue<Date>;
    onUpdateAction?: ActionValue;
    path: string;
}

export interface WebsocketPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
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
