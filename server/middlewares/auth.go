package middlewares

import (
    "net/http"
    "os"

    "github.com/gin-gonic/gin"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

func Auth() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(401, gin.H{"error": "Token required"})
            c.Abort()
            return
        }

        tokenString := authHeader[len("Bearer "):]

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return jwtKey, nil
        })

        if err != nil || !token.Valid {
            c.JSON(401, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        claims := token.Claims.(jwt.MapClaims)
        c.Set("role", claims["role"])
        c.Next()
    }
}

func IsAdmin() gin.HandlerFunc{
    return func(c *gin.Context){
        authHeader := c.GetHeader("Authorization")

        if authHeader == "" {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Token Not Found"})
            c.Abort()
            return
        }

        tokenString := authHeader[len("Bearer "):]        

        token ,err := jwt.Parse(tokenString,func(token *jwt.Token)(interface{},error){
            if _,ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil,jwt.ErrSignatureInvalid
            }
            return jwtKey,nil
        })

        if err!=nil || !token.Valid {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Token or Token Expired "})
            c.Abort()
            return
        }

        claims, ok := token.Claims.(jwt.MapClaims)

        if !ok {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Token Claims"})
            c.Abort()
            return 
        }

        if claims["role"] != "admin" {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Access Denied"})
            c.Abort()
            return 
        }

        c.Next()
    }
}
func IsSuperAdmin() gin.HandlerFunc{
    return func(c *gin.Context){
        authHeader := c.GetHeader("Authorization")

        if authHeader == "" {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Token Not Found"})
            c.Abort()
            return
        }

        tokenString := authHeader[len("Bearer "):]        

        token ,err := jwt.Parse(tokenString,func(token *jwt.Token)(interface{},error){
            if _,ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
                return nil,jwt.ErrSignatureInvalid
            }
            return jwtKey,nil
        })

        if err!=nil || !token.Valid {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Token or Token Expired "})
            c.Abort()
            return
        }

        claims, ok := token.Claims.(jwt.MapClaims)

        if !ok {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Invalid Token Claims"})
            c.Abort()
            return 
        }

        if claims["role"] != "superadmin" {
            c.JSON(http.StatusUnauthorized,gin.H{"error":"Access Denied"})
            c.Abort()
            return 
        }

        c.Next()
    }
}
func AdminOrSuperAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("role")

		if !exists || (role != "admin" && role != "superadmin") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Access Denied"})
			c.Abort()
			return
		}

		c.Next()
	}
}
