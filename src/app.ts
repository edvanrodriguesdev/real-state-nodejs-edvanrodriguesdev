import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleErrors } from "./errors"
import { loginRoutes } from "./routers/login.routes"
import { userRoutes } from "./routers/users.routes"
import { realEstateRoutes } from "./routers/realEstate.routes"
import { categoriesRoutes } from "./routers/categories.routes"
import { schedulesRoutes } from "./routers/schedules.routes"


const app = express()
app.use(express.json())

app.use('/login', loginRoutes)
app.use('/users', userRoutes)
app.use('/realEstate', realEstateRoutes)
app.use('/categories', categoriesRoutes)
app.use('/schedules', schedulesRoutes)

app.use(handleErrors)


export default app