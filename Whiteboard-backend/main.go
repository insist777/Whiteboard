package main

import (
	"log"
	"net/http"
)

func main() {

	hubList := &HubList{hublist: make([]Hub, 0)}

	InitRouter(hubList)

	hub := newHub()

	go hub.run()

	http.HandleFunc("/ws", hubList.handleWebSocket)
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}

}
