# MendixWebsocket
 Client widget for the websocket push module


# Installation
1.	Download the ‘Websocket’ module from the Marketplace which includes the widget for Mendix 9 and a module for Mendix 9.6.9 or later.
2.	Call the ASU_InstallCustomWebsocketHandler to install the websocket handler in your after startup chain.
How to prepare
1.	Choose to select which entity you want to use. The requirement is that the attribute names are as in the example WebsocketMessage Text1, Text2, Text3, Progress, Busy, Value, Datetime. You need an object for every user who wants to receive messages. 
2.	Update the security to your own requirements.
3.	The entity can be a non-persistable entity.
4.	Choose a websocket name so it can act as an endpoint for example www.mymendixapp.com/notifications. In this case set the constant WebsocketName to ‘notifications’. Don’t use reserved words like ‘debugger’, ‘xas’ and ‘mxdevtools’
How to send updates from the server
1.	Choose a trigger, for example: data is updated or a microflow has progress.
2.	Find or create the WebsocketMessage object which serves as channel to send updates to subscribed clients.
3.	Call the action ‘Send websocket message’ (JA_SendWebsocketMessage) and pass the message object 
How to receive updates in the browser
1.	Find or create the WebsocketMessage object
2.	Add a dataview to your page with a datasource that returns an object of type message object from preparation step 1
3.	Add the ‘Websocket’ widget to the dataview.
4.	Connect the used attributes. The connected attributes are updated via the websocket. You don’t need to retrieve data from the database. In case other data is required, you can do that in an event microflow.
5.	Optionally connect a microflow to ‘on receive update’ and perform actions in the microflow like refresh or show a toaster.

# You can use two ways to update data
1.	When OnReceiveUpdate is called retrieve the updated data in a microflow from the server
2.	For small changes use the attributes like text1, text2 and progress. The values are sent with the update message and immediately available in the attribute values of the object. 

# System wide broadcast messages
1.	Create a layout with a snippet
2.	Place a dataview in the snippet with a datasource microflow for example: DS_WebsocketMessage. Find a way to create and share one single object of  WebsocketMessage. For example a FindOrCreate microflow and/or an association to a settings object.
3.	Place the Websocket listener to the dataview, connect the required attributes.
4.	Add a Nanoflow or Microflow to ‘On receive update’ that shows a message or a toaster.
5.	Make an admin screen that allow to change the message of WebsocketMessage and call JA_SendWebsocketMessage with object
Microflow progress example
1.	Create a form or snippet with a dataview with WebsocketMessage entity
2.	Add a progress bar. Connect to the progress attribute.
3.	Place the Websocket listener to the dataview, connect the required attributes.
4.	Start the long running microflow.
5.	Find out a way to determine the progress, for example in a loop. Create a counter and increment that when progress is made. Don’t send the updates too often. 
6.	Send the progress to the front end with JA_SendWebsocketMessage

# Warnings and limitations
1.	Don’t send confidential data via websockets but use Guids and use the OnReceiveUpdate event handlers to get the confidential data. Although the subscription is protected to logged in sessions, it is better to keep a second defense layer.
2.	No complex system of subscriptions is implemented, just a subscription of the current object.
3.	Don’t use the onReceiveUpdate events for transactions of that user, only for updating and refreshing the screen. Other browser screen would invoke that transaction also.

# Security
1.	The subscribe mechanism is protected with the current user CSRF-token, so hackers can not subscribe without logging into the app.
2.	Locally it uses the ws:// protocol, in the cloud wss:// so the message cannot be intercepted.
3.	Clients trying to send data malformed or unauthorized data to the websocket, they are automatically disconnected.

# Technical aspects
1.	Every 15 seconds a keepalive is sent from a client to the server.
2.	You can use multiple WebsocketMessage objects as ‘channel’ to address different users or groups. 
3.	You cannot uninstall the requesthandler
4.	If you add attributes to the WebsocketMessage entity they are not automatically available in the client. You need to retrieve the object from the database in that case.
5.	You can install multiple websockethandlers with JA_InstallCustomWebsocketHandler but that is not officially supported yet 
6.	JA_InstallCustomWebsocketHandler will raise an exception when a reserved word is used.
7.	The client that sends a message will also receive it.
8.	No messages are sent to the server with the websocket. You can use regular Mendix functionality for that, like microflows. 

# Known issues
1.	For the warning-hunters: the websocket image is used in Mendix 9.6 for the  published java action but in higher Mendix version this image is copied inside the java-action and no longer needed in the images collection. You may delete it. 


