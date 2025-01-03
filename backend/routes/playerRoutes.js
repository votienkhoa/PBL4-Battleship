import express from 'express'
import {getPlayerInfo} from '../controllers/playerController.js'
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router()

router.get('/myInfo', authenticateToken, getPlayerInfo)
router.get('/playerInfo/:id',getPlayerInfo)

export default router