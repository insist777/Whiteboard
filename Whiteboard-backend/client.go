package main

import (
	"Whiteboard-backend/utils"
	"fmt"
	"github.com/gorilla/websocket"
	uuid "github.com/satori/go.uuid"
)

type Client struct {
	id       string
	hub      *Hub
	color    string
	socket   *websocket.Conn
	outbound chan []byte
}

func newClient(hub *Hub, socket *websocket.Conn) *Client {
	return &Client{
		id:       uuid.NewV4().String(),
		color:    utils.GenerateColor(),
		hub:      hub,
		socket:   socket,
		outbound: make(chan []byte),
	}
}

func (client *Client) read() {
	defer func() {
		client.hub.unregister <- client
	}()

	for {
		_, data, err := client.socket.ReadMessage()
		if err != nil {
			break
		}
		client.hub.onMessage(data)
	}
}

func (client *Client) write() {
	for {
		data, ok := <-client.outbound
		if !ok {
			client.socket.WriteMessage(websocket.CloseMessage, []byte{})
			return
		}
		err := client.socket.WriteMessage(websocket.TextMessage, data)
		if err != nil {
			fmt.Println(err)
		}
	}
}

func (client Client) run() {
	go client.read()
	go client.write()
}

func (client Client) close() {
	client.socket.Close()
	close(client.outbound)
}
