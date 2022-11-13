package main

import (
	"Whiteboard-backend/api"
	"Whiteboard-backend/middleware"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type HubList struct {
	hublist []Hub
}

func (hubList *HubList) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	socket, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		http.Error(w, "could not upgrade", http.StatusInternalServerError)
		return
	}
	hub := newHub()
	_ = append(hubList.hublist, *hub)
	client := newClient(hub, socket)
	hub.clients = append(hub.clients, client)
	hub.register <- client
	client.run()
}
func InitRouter(hubList *HubList) {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())

	router := r.Group("")
	{
		router.GET("/sync", api.Sync)
		router.POST("/login", api.Login)

	}

	r.Run(":3000")
}
