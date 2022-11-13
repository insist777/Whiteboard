package main

import (
	"Whiteboard-backend/model"
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"sync"
)

var i = 0

var upgrader = &websocket.Upgrader{ReadBufferSize: 512,
	WriteBufferSize: 512, CheckOrigin: func(r *http.Request) bool { return true }}

type Hub struct {
	clients     []*Client
	register    chan *Client
	unregister  chan *Client
	outboundMap map[int]string
	mapLock     sync.RWMutex
}

func newHub() *Hub {
	name := "{\"type\": \"cache\", \"body\": [{\"id\":\"container_1\",\"name\":\"随便画画1\",\"shapes\":[{\"shapeId\":\"10023\",\"userId\":\"324ad43bc2\",\"type\":\"rect\",\"position\":{\"x\":60,\"y\":60},\"lineStyle\":{\"type\":\"solid\",\"weight\":\"2px\",\"color\":\"#ff0000\"},\"fillStyle\":{\"color\":\"#ff0000\"},\"attrs\":{\"size\":{\"width\":100,\"height\":100}}}]},{\"id\":\"container_2\",\"name\":\"随便画画2\",\"shapes\":[{\"shapeId\":\"10024\",\"userId\":\"324ad43bc2\",\"type\":\"rect\",\"position\":{\"x\":100,\"y\":200},\"lineStyle\":{\"type\":\"solid\",\"weight\":\"2px\",\"color\":\"#00ff00\"},\"fillStyle\":{\"color\":\"#00ff00\"},\"attrs\":{\"size\":{\"width\":80,\"height\":80}}}]},{\"id\":\"container_3\",\"name\":\"随便画画3\",\"shapes\":[{\"shapeId\":\"10027\",\"userId\":\"324ad43bc2\",\"type\":\"rect\",\"position\":{\"x\":300,\"y\":300},\"lineStyle\":{\"type\":\"solid\",\"weight\":\"2px\",\"color\":\"#ff0000\"},\"fillStyle\":{\"color\":\"#0000ff\"},\"attrs\":{\"size\":{\"width\":150,\"height\":150}}}]}]}"
	h := &Hub{
		clients:     make([]*Client, 0),
		register:    make(chan *Client),
		unregister:  make(chan *Client),
		outboundMap: make(map[int]string),
	}
	h.outboundMap[i] = name
	i++
	return h

}

func (hub *Hub) run() {
	for {
		select {
		case client := <-hub.register:
			hub.onConnect(client)
		case client := <-hub.unregister:
			hub.onDisconnect(client)
		}
	}
}

func (hub *Hub) send(model interface{}, client *Client) {
	data, _ := json.Marshal(model)
	client.outbound <- data
	client.outbound <- []byte(hub.outboundMap[0])
}

// broadcast method broadcasts a message to all clients, except one(sender).
func (hub *Hub) broadcast(model interface{}, ignore *Client) {
	data, _ := json.Marshal(model)
	for _, c := range hub.clients {
		if c != ignore {
			c.outbound <- data
		}
	}
}

func (hub *Hub) broadcast2(model string) {
	for _, c := range hub.clients {
		bytes := []byte(model)
		c.outbound <- bytes
	}
}

func (hub *Hub) onConnect(client *Client) {
	log.Println("client connected: ", client.socket.RemoteAddr())

	users := []model.User{}
	for _, c := range hub.clients {
		users = append(users, model.User{ID: c.id, Color: c.color})
	}

	hub.send(model.NewConnected(client.color, users), client)
	hub.broadcast(model.NewUserJoined(client.id, client.color), client)
}

func (hub *Hub) onDisconnect(client *Client) {
	log.Println("client disconnected: ", client.socket.RemoteAddr())
	client.close()

	i := -1
	for j, c := range hub.clients {
		if c.id == client.id {
			i = j
			break
		}
	}

	copy(hub.clients[i:], hub.clients[i+1:])
	hub.clients[len(hub.clients)-1] = nil
	hub.clients = hub.clients[:len(hub.clients)-1]
}

func (hub *Hub) onMessage(data []byte) {
	msg := string(data)
	hub.outboundMap[i] = msg
	i++
	hub.broadcast2(msg)
}
