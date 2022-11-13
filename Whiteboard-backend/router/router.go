package router

import (
	"Whiteboard-backend/api"
	"Whiteboard-backend/middleware"
	_ "github.com/gin-contrib/multitemplate"
	"github.com/gin-gonic/gin"
)

func InitRouter() {
	r := gin.New()
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())

	router := r.Group("/api")
	{
		router.GET("/sync", api.Sync)
		router.POST("/login", api.Login)

	}
	
	r.Run(":8080")
}
