package main

import (
	"Whiteboard-backend/router"
	"log"
	"net/http"
)

func main() {
	router.InitRouter()

	hubList := HubList{}

	hub := newHub()

	go hub.run()

	http.HandleFunc("/ws", hubList.handleWebSocket)
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}

}
